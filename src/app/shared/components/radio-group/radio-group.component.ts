import {Component, Input} from '@angular/core';
import {RadioButton} from "../../../core/models/radio-button";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule
  ],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.css'
})
export class RadioGroupComponent {
  @Input({required: true}) label: string
  @Input({required: true}) buttons: RadioButton[]
  @Input({required: true}) control: FormControl
}
