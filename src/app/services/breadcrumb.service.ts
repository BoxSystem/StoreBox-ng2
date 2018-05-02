import {
    ActivatedRoute,
    PRIMARY_OUTLET
} from '@angular/router';
import {
    Injectable
} from '@angular/core';

interface IBreadcrumb {
    label: string;
    url: string;
}

@Injectable()
export class SamBreadcrumbService {
    _separator: string;
    _breadItems = [];
    constructor(
        private acRouter: ActivatedRoute,
    ) {}
    public get separator() {
        return this._separator;
    }
    public set separator(v) {
        if (v) {
            this._separator = v;
        }
    }
    getBreadcrumbs(route: ActivatedRoute = this.acRouter.root, url: string = '', breadcrumbs: IBreadcrumb[] = []): IBreadcrumb[] {
        const ROUTE_DATA_BREADCRUMB = 'breadcrumb';

        // get the child routes
        const children: ActivatedRoute[] = route.children;

        // return if there are no more children
        if (children.length === 0) {
            return breadcrumbs;
        }
        if(!url) {
            url = route.url.value.map(segment => segment.path).join('/');
        }

        // iterate over each children
        for (const child of children) {
            // verify primary route
            if (child.outlet !== PRIMARY_OUTLET) {
                continue;
            }

            // verify the custom data property "breadcrumb" is specified on the route
            if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
                return this.getBreadcrumbs(child, url, breadcrumbs);
            }
            // get the route's URL segment
            let routeURL: string = child.url.value.map(segment => segment.path).join('/');

            // append route URL to URL
            url += `/${routeURL}`;
            // add breadcrumb
            const breadcrumb: IBreadcrumb = {
                label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
                url: `/${url}`
            };
            breadcrumbs.push(breadcrumb);

            // recursive
            return this.getBreadcrumbs(child, url, breadcrumbs);
        }

        return breadcrumbs;
    }
}
