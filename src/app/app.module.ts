import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumComponent } from './album/album.component';
import { ArtistComponent } from './artist/artist.component';
import { RoundComponent } from './round/round.component';
import { TrackComponent } from './track/track.component';
import { UserComponent } from './user/user.component';
import { VoteSetComponent } from './vote-set/vote-set.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumComponent,
    ArtistComponent,
    RoundComponent,
    TrackComponent,
    UserComponent,
    VoteSetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
