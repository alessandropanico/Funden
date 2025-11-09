import { Component } from '@angular/core';

@Component({
    selector: 'app-projectdetails',
    templateUrl: './projectdetails.component.html',
    styleUrls: ['./projectdetails.component.css'],
    standalone: false
})
export class ProjectdetailsComponent {
    activeButtonIndex: number | null = null;
    buttonLabels: string[] = ['€50', '€150', '€200', '€500', '€1000'];

    toggleButton(index: number): void {
        this.activeButtonIndex = index;
    }

    dis:boolean=false;
}
