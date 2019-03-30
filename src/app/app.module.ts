import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddAlbumComponent } from './add-album/add-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { ViewAlbumComponent } from './view-album/view-album.component';
import { AddArtistComponent } from './add-artist/add-artist.component';
import { EditArtistComponent } from './edit-artist/edit-artist.component';
import { ViewArtistComponent } from './view-artist/view-artist.component';
import { AddRoundComponent } from './add-round/add-round.component';
import { EditRoundComponent } from './edit-round/edit-round.component';
import { ViewRoundComponent } from './view-round/view-round.component';
import { AddTrackComponent } from './add-track/add-track.component';
import { EditTrackComponent } from './edit-track/edit-track.component';
import { ViewTrackComponent } from './view-track/view-track.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AddVoteSetComponent } from './add-vote-set/add-vote-set.component';
import { EditVoteSetComponent } from './edit-vote-set/edit-vote-set.component';
import { ViewVoteSetComponent } from './view-vote-set/view-vote-set.component';
import { ViewAlbumsComponent } from './view-albums/view-albums.component';
import { ViewArtistsComponent } from './view-artists/view-artists.component';
import { ViewRoundsComponent } from './view-rounds/view-rounds.component';
import { ViewTracksComponent } from './view-tracks/view-tracks.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ViewVoteSetsComponent } from './view-vote-sets/view-vote-sets.component';

@NgModule({
  declarations: [
    AppComponent,
    AddAlbumComponent,
    EditAlbumComponent,
    ViewAlbumComponent,
    AddArtistComponent,
    EditArtistComponent,
    ViewArtistComponent,
    AddRoundComponent,
    EditRoundComponent,
    ViewRoundComponent,
    AddTrackComponent,
    EditTrackComponent,
    ViewTrackComponent,
    AddUserComponent,
    EditUserComponent,
    ViewUserComponent,
    AddVoteSetComponent,
    EditVoteSetComponent,
    ViewVoteSetComponent,
    ViewAlbumsComponent,
    ViewArtistsComponent,
    ViewRoundsComponent,
    ViewTracksComponent,
    ViewUsersComponent,
    ViewVoteSetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
