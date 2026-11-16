import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnChanges, OnDestroy, SimpleChanges, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TravelNode } from '../data/travel-data';

@Component({
  selector: 'app-header-submenu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-submenu.component.html',
  styleUrls: ['./header-submenu.component.scss']
})
export class HeaderSubmenuComponent implements OnChanges, OnDestroy {
  private static nextId = 0;
  readonly panelId = `destination-branch-${HeaderSubmenuComponent.nextId++}`;
  @Input() node!: TravelNode;
  @Input() compact = false;
  @Input() isOpen = false;
  @ViewChild('panel') private panel?: ElementRef<HTMLElement>;
  @ViewChild('trigger') private trigger?: ElementRef<HTMLButtonElement>;
  private frame?: number;
  private focusChild = false;

  openChildKey: string | null = null;

  @Output() toggleOpen = new EventEmitter<string>();
  @Output() selected = new EventEmitter<TravelNode>();

  constructor(private router: Router, private element: ElementRef<HTMLElement>) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] || changes['compact']) {
      if (!this.isOpen) this.openChildKey = null;
      if (this.isOpen && !this.compact) this.schedulePosition();
    }
  }

  ngOnDestroy(): void {
    if (this.frame !== undefined) this.element.nativeElement.ownerDocument.defaultView?.cancelAnimationFrame(this.frame);
  }

  onPointerEnter(event: PointerEvent): void {
    if (!this.compact && event.pointerType === 'mouse' && this.node.hijos?.length && !this.isOpen) {
      this.toggleOpen.emit(this.keyOf(this.node));
    }
  }

  onPointerLeave(event: PointerEvent): void {
    if (!this.compact && event.pointerType === 'mouse' && this.isOpen) {
      this.toggleOpen.emit(this.keyOf(this.node));
    }
  }

  onFocusOut(event: FocusEvent): void {
    if (!this.compact && this.isOpen && !this.element.nativeElement.contains(event.relatedTarget as Node | null)) {
      this.toggleOpen.emit(this.keyOf(this.node));
    }
  }

  onKeydown(event: KeyboardEvent): void {
    if (this.compact) return;
    if ((event.key === 'Escape' || event.key === 'ArrowLeft') && this.isOpen) {
      event.preventDefault();
      event.stopPropagation();
      this.toggleOpen.emit(this.keyOf(this.node));
      this.trigger?.nativeElement.focus();
    } else if ((event.key === 'ArrowDown' || event.key === 'ArrowRight') && event.target === this.trigger?.nativeElement) {
      event.preventDefault();
      event.stopPropagation();
      this.focusChild = true;
      if (!this.isOpen) this.toggleOpen.emit(this.keyOf(this.node));
      this.schedulePosition();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.isOpen && !this.compact) this.schedulePosition();
  }

  onPanelScroll(event: Event): void {
    if (!this.compact && event.target === event.currentTarget) this.openChildKey = null;
  }

  private schedulePosition(): void {
    const view = this.element.nativeElement.ownerDocument.defaultView;
    if (!view) return;
    if (this.frame !== undefined) view.cancelAnimationFrame(this.frame);
    this.frame = view.requestAnimationFrame(() => {
      this.frame = undefined;
      const panel = this.panel?.nativeElement;
      const anchor = this.trigger?.nativeElement.getBoundingClientRect();
      if (!this.isOpen || this.compact || !panel || !anchor) return;
      const margin = 8;
      const viewportWidth = this.element.nativeElement.ownerDocument.documentElement.clientWidth;
      const width = Math.min(224, viewportWidth - margin * 2);
      const nested = !!this.element.nativeElement.parentElement?.closest('.submenu');
      const right = anchor.right - 1;
      const flip = nested && right + width > viewportWidth - margin;
      const left = nested ? (flip ? anchor.left - width + 1 : right) : anchor.left;
      const top = nested ? Math.max(margin, Math.min(anchor.top, view.innerHeight - panel.offsetHeight - margin)) : anchor.bottom;
      panel.style.width = `${width}px`;
      panel.style.left = `${Math.max(margin, Math.min(left, viewportWidth - width - margin))}px`;
      panel.style.top = `${top}px`;
      panel.style.setProperty('--panel-height', `${Math.max(0, view.innerHeight - top - margin - 2)}px`);
      panel.classList.toggle('opens-left', flip);
      if (this.focusChild) {
        this.focusChild = false;
        panel.querySelector<HTMLElement>('.menu-btn')?.focus();
      }
    });
  }

  keyOf(n: TravelNode): string {
    return n.path ?? n.nombre;
  }

  nodeIcon(n: TravelNode): string | null {
    if (n.isCapital) return 'star';
    if (n.isImportantCity) return 'location_city';

    return null;
  }

  toggleChild(childKey: string) {
    this.openChildKey = (this.openChildKey === childKey) ? null : childKey;
  }

  onClick(n: TravelNode, event: MouseEvent) {
    event.stopPropagation();

    if (n.hijos?.length) {
      if (this.compact || !this.isOpen || event.detail === 0 || (event as PointerEvent).pointerType !== 'mouse') {
        this.toggleOpen.emit(this.keyOf(n));
      }
      return;
    }

    if (n.path) {
      this.router.navigateByUrl(`/guia/${n.path}`);
    }

    this.selected.emit(n);
  }

  onSelected(n: TravelNode) {
    this.selected.emit(n);
  }
}
