import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationService } from '../../services/validation-service/validation.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-control-message',
  templateUrl: './control-message.component.html',
  styleUrls: ['./control-message.component.scss'],
  imports: [MatTooltipModule, NgClass],
})
export class ControlMessageComponent {
  @Input() control: AbstractControl | null;
  @Input() isMarginTopEnabled = true;
  @Input() isMarginBottomEnabled = false;
  @Input() isErrorMessageCentered = false;
  @Input() marginTopOverride = 'mt-1';
  @Input() label = '';
  @Input() tooltip = '';
  @Input() customMessages: { [key: string]: string } = {};

  /**
   * @description Retrieves the error message for the control.
   * @returns {string} The error message for the control, or false if no errors are found.
   */
  get errorMessage(): string {
    const errorEntries = Object.entries(this.control?.errors || {});
    let result = '';
    errorEntries.forEach(([propertyName, propertyValue]) => {
      if (this.control && this.control.touched) {
        if (this.customMessages[propertyName]) {
          result = this.customMessages[propertyName];
          return;
        }
        result = ValidationService.getValidationErrorMessage(
          propertyName,
          propertyValue,
          this.label,
        );
      }
    });
    return result;
  }
}
