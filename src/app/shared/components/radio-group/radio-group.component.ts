import {Component, Input} from '@angular/core';
import {RadioButton} from "../../../core/models/radio-button";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [
    MatRadioButton,
    MatRadioGroup,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.css'
})
export class RadioGroupComponent {
  @Input() label: string
  @Input({required: true}) buttons: RadioButton[]
  @Input({required: true}) control: FormControl
}
