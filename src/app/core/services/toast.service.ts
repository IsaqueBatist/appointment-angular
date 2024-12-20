import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
	toasts: any[] = [];

	show(textOrTpl: string | TemplateRef<any>, option: any = {}) {
		this.toasts.push({textOrTpl, ...option});
	}

	remove(toast: any) {
		this.toasts = this.toasts.filter((t) => t !== toast);
	}

	clear() {
		this.toasts.splice(0, this.toasts.length);
	}
  constructor() { }
}
