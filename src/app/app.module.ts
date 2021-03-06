import { AuthService } from './services/auth.service';
import { FnService } from './services/fn.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
    ],
    providers: [
        FnService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
