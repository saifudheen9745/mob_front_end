import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedMethodsService {

   /**
   * @description -Prevents invalid keyboard input by allowing only numeric characters.
   * @param event -The keyboard event triggered when a key is pressed.
   */
   preventNonNumbers(event: KeyboardEvent) {
    if (event instanceof KeyboardEvent) {
      const k = event.key.charCodeAt(0);
      // Allow only numeric input (key codes 48-57 represent digits 0-9)
      if (
        k < 48 ||
        k > 57
      ) {
        event.preventDefault();
      }
    }
  }

}
