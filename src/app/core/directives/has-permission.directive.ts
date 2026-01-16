import {
  Directive,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PermissionService } from '../services/permission/permission.service';

type Action =
  | 'view'
  | 'create'
  | 'edit'
  | 'delete'
  | 'approve'
  | 'reject'
  | 'block'
  | 'unblock';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit, OnDestroy {

  private sub!: Subscription;

  @Input('hasPermission') permission!: [string, Action];

  constructor(
    private tpl: TemplateRef<any>,
    private vcr: ViewContainerRef,
    private permissionService: PermissionService
  ) {}

  ngOnInit() {
    this.sub = this.permissionService.permissionsReady$()
      .subscribe(loaded => {
        if (!loaded) return;

        this.vcr.clear();

        const [pageCode, action] = this.permission;
        if (this.permissionService.hasPermission(pageCode, action)) {
          this.vcr.createEmbeddedView(this.tpl);
        }
      });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
