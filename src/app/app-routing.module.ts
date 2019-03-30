import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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

const routes: Routes = [
	{ path: 'add-album', component: AddAlbumComponent },
	{ path: 'edit-album/:id', component: EditAlbumComponent },
	{ path: 'view-album/:id', component: ViewAlbumComponent },
	{ path: 'add-artist', component: AddArtistComponent },
	{ path: 'edit-artist/:id', component: EditArtistComponent },
	{ path: 'view-artist/:id', component: ViewArtistComponent },
	{ path: 'add-round', component: AddRoundComponent },
	{ path: 'edit-round/:id', component: EditRoundComponent },
	{ path: 'view-round/:id', component: ViewRoundComponent },
	{ path: 'add-track', component: AddTrackComponent },
	{ path: 'edit-track/:id', component: EditTrackComponent },
	{ path: 'view-track/:id', component: ViewTrackComponent },
	{ path: 'add-user', component: AddUserComponent },
	{ path: 'edit-user/:id', component: EditUserComponent },
	{ path: 'view-user/:id', component: ViewUserComponent },
	{ path: 'add-vote-set', component: AddVoteSetComponent },
	{ path: 'edit-vote-set/:id', component: EditVoteSetComponent },
	{ path: 'view-vote-set/:id', component: ViewVoteSetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
