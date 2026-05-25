import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

interface CacheItem {
  data: any;
  timestamp: number;
  expiry: number;
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private readonly CACHE_PREFIX = 'judo_cache_';
  private readonly NAVIGATION_FLAG = 'judo_navigation_flag';
  private readonly DEFAULT_CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  constructor() {
    // Check if this is a fresh page load or navigation
    this.handlePageLoad();
    
    // Clean expired cache items on service initialization
    this.cleanExpiredItems();

    // Set up beforeunload listener to mark navigation
    this.setupNavigationTracking();
  }

  /**
   * Handle page load - clear cache if it's a refresh, keep if it's navigation
   */
  private handlePageLoad(): void {
    try {
      // Check if this is a page refresh using performance API
      const navigationType = this.getNavigationType();
      
      if (navigationType === 'reload') {
        // This is a refresh - clear all cache
        console.log('Page refresh detected - clearing cache');
        this.clearAllCacheItems();
      } else {
        // This is navigation or first load - keep cache
        console.log('Navigation or first load detected - keeping cache');
      }
    } catch (error) {
      console.error('Error handling page load:', error);
    }
  }

  /**
   * Get navigation type using performance API
   */
  private getNavigationType(): string {
    try {
      // Modern browsers
      if ('navigation' in performance && 'type' in performance.navigation) {
        const perfNavigation = performance.navigation as any;
        switch (perfNavigation.type) {
          case 0: return 'navigate'; // TYPE_NAVIGATE
          case 1: return 'reload';   // TYPE_RELOAD
          case 2: return 'back_forward'; // TYPE_BACK_FORWARD
          default: return 'navigate';
        }
      }

      // Newer Performance API
      if ('getEntriesByType' in performance) {
        const navigationEntries = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
        if (navigationEntries.length > 0) {
          return navigationEntries[0].type;
        }
      }

      // Fallback
      return 'navigate';
    } catch (error) {
      console.error('Error detecting navigation type:', error);
      return 'navigate';
    }
  }

  /**
   * Set up navigation tracking (simplified version)
   */
  private setupNavigationTracking(): void {
    // We no longer need complex event listeners since we're using performance API
    // This method is kept for potential future enhancements
  }

  /**
   * Clear all cache items (internal method)
   */
  private clearAllCacheItems(): void {
    try {
      const keysToRemove: string[] = [];
      
      // Find all cache keys (but not the navigation flag)
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith(this.CACHE_PREFIX)) {
          keysToRemove.push(key);
        }
      }

      // Remove all cache keys
      keysToRemove.forEach(key => sessionStorage.removeItem(key));
      
      if (keysToRemove.length > 0) {
        console.log(`Cache cleared on refresh (${keysToRemove.length} items)`);
      }
    } catch (error) {
      console.error('Error clearing cache items:', error);
    }
  }

  /**
   * Get cached data if it exists and is not expired
   * @param key Cache key
   * @returns Cached data or null if not found/expired
   */
  get<T>(key: string): T | null {
    try {
      const cacheKey = this.CACHE_PREFIX + key;
      const itemJson = sessionStorage.getItem(cacheKey);
      
      if (!itemJson) {
        return null;
      }

      const item: CacheItem = JSON.parse(itemJson);

      // Check if item has expired
      if (Date.now() > item.expiry) {
        sessionStorage.removeItem(cacheKey);
        console.log(`Cache EXPIRED and removed for key: ${key}`);
        return null;
      }

      console.log(`Cache HIT for key: ${key}`);
      return item.data as T;
    } catch (error) {
      console.error(`Error reading cache for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Set data in cache with expiration
   * @param key Cache key
   * @param data Data to cache
   * @param durationMs Cache duration in milliseconds (default: 24 hours)
   */
  set<T>(key: string, data: T, durationMs: number = this.DEFAULT_CACHE_DURATION): void {
    try {
      const now = Date.now();
      const item: CacheItem = {
        data,
        timestamp: now,
        expiry: now + durationMs
      };

      const cacheKey = this.CACHE_PREFIX + key;
      sessionStorage.setItem(cacheKey, JSON.stringify(item));
      
      const hoursUntilExpiry = durationMs / 1000 / 60 / 60;
      console.log(`Cache SET for key: ${key}, expires in ${hoursUntilExpiry.toFixed(1)} hours`);
    } catch (error) {
      console.error(`Error setting cache for key ${key}:`, error);
      // If sessionStorage is full, try to clean old items and retry
      this.cleanExpiredItems();
      try {
        const cacheKey = this.CACHE_PREFIX + key;
        sessionStorage.setItem(cacheKey, JSON.stringify({
          data,
          timestamp: Date.now(),
          expiry: Date.now() + durationMs
        }));
      } catch (retryError) {
        console.error(`Failed to cache data after cleanup for key ${key}:`, retryError);
      }
    }
  }

  /**
   * Cache an Observable's result
   * @param key Cache key
   * @param observable$ Observable to cache
   * @param durationMs Cache duration in milliseconds
   * @returns Observable that uses cache or makes API call
   */
  cacheObservable<T>(key: string, observable$: Observable<T>, durationMs: number = this.DEFAULT_CACHE_DURATION): Observable<T> {
    // Check if we have cached data
    const cachedData = this.get<T>(key);
    
    if (cachedData !== null) {
      return of(cachedData);
    }

    // No cached data, make API call and cache the result
    console.log(`Cache MISS for key: ${key}, making API call`);
    return observable$.pipe(
      tap(data => this.set(key, data, durationMs))
    );
  }

  /**
   * Clear specific cache entry
   * @param key Cache key to clear
   */
  clear(key: string): void {
    try {
      const cacheKey = this.CACHE_PREFIX + key;
      sessionStorage.removeItem(cacheKey);
      console.log(`Cache CLEARED for key: ${key}`);
    } catch (error) {
      console.error(`Error clearing cache for key ${key}:`, error);
    }
  }

    /**
   * Clear all cache entries
   */
  clearAll(): void {
    this.clearAllCacheItems();
  }

  /**
   * Clean expired cache items
   */
  private cleanExpiredItems(): void {
    try {
      const now = Date.now();
      const keysToRemove: string[] = [];

      // Find expired cache items
      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith(this.CACHE_PREFIX)) {
          try {
            const itemJson = sessionStorage.getItem(key);
            if (itemJson) {
              const item: CacheItem = JSON.parse(itemJson);
              if (now > item.expiry) {
                keysToRemove.push(key);
              }
            }
          } catch (error) {
            // If we can't parse the item, remove it
            keysToRemove.push(key);
          }
        }
      }

      // Remove expired items
      keysToRemove.forEach(key => sessionStorage.removeItem(key));

      if (keysToRemove.length > 0) {
        console.log(`Cleaned ${keysToRemove.length} expired cache items`);
      }
    } catch (error) {
      console.error('Error cleaning expired cache items:', error);
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): { size: number; keys: string[]; totalSizeKB: number } {
    try {
      const cacheKeys: string[] = [];
      let totalSize = 0;

      for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        if (key && key.startsWith(this.CACHE_PREFIX)) {
          const cleanKey = key.replace(this.CACHE_PREFIX, '');
          cacheKeys.push(cleanKey);
          
          const item = sessionStorage.getItem(key);
          if (item) {
            totalSize += item.length;
          }
        }
      }

      return {
        size: cacheKeys.length,
        keys: cacheKeys,
        totalSizeKB: Math.round(totalSize / 1024 * 100) / 100
      };
    } catch (error) {
      console.error('Error getting cache stats:', error);
      return { size: 0, keys: [], totalSizeKB: 0 };
    }
  }

  /**
   * Check if sessionStorage is available
   */
  private isSessionStorageAvailable(): boolean {
    try {
      const test = '__sessionStorage_test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}