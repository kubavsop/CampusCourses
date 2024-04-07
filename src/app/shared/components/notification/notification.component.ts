import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {NotificationDto} from "../../../core/models/dtos/notification-dto";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [MatCardModule, NgClass],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  @Input({required: true}) notificationDto: NotificationDto
}
