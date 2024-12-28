import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageHelperService {
  private readonly fallbackImage = 'assets/images/empty.jpg'; // Default fallback image

  /**
   * Returns the fallback image if the source image is null, undefined, or fails to load.
   * @param event The error event from the image element.
   */
  handleImageError(event: Event): void {
    const target = event.target as HTMLImageElement;
    target.src = this.fallbackImage;
  }
}
