import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddAlbumComponent } from './add-album/add-album.component';
import { EditAlbumComponent } from './edit-album/edit-album.component';
import { ViewAlbumComponent } from './view-album/view-album.component';
import { ViewAlbumsComponent } from './view-albums/view-albums.component';
import { AddArtistComponent } from './add-artist/add-artist.component';
import { EditArtistComponent } from './edit-artist/edit-artist.component';
import { ViewArtistComponent } from './view-artist/view-artist.component';
import { ViewArtistsComponent } from './view-artists/view-artists.component';
import { AddRoundComponent } from './add-round/add-round.component';
import { EditRoundComponent } from './edit-round/edit-round.component';
import { ViewRoundComponent } from './view-round/view-round.component';
import { ViewRoundsComponent } from './view-rounds/view-rounds.component';
import { AddTrackComponent } from './add-track/add-track.component';
import { EditTrackComponent } from './edit-track/edit-track.component';
import { ViewTrackComponent } from './view-track/view-track.component';
import { ViewTracksComponent } from './view-tracks/view-tracks.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { AddVoteSetComponent } from './add-vote-set/add-vote-set.component';
import { EditVoteSetComponent } from './edit-vote-set/edit-vote-set.component';
import { ViewVoteSetComponent } from './view-vote-set/view-vote-set.component';
import { ViewVoteSetsComponent } from './view-vote-sets/view-vote-sets.component';
import { LoginComponent } from './login/login.component';
import { AnalysisComponent } from './analysis/analysis.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RateComponent } from './rate/rate.component';

const routes: Routes = [
	{ path: 'add-album', component: AddAlbumComponent },
	{ path: 'edit-album/:id', component: EditAlbumComponent },
	{ path: 'view-albums', component: ViewAlbumsComponent },
	{ path: 'view-album/:id', component: ViewAlbumComponent },
	{ path: 'add-artist', component: AddArtistComponent },
	{ path: 'edit-artist/:id', component: EditArtistComponent },
	{ path: 'view-artists', component: ViewArtistsComponent },
	{ path: 'view-artist/:id', component: ViewArtistComponent },
	{ path: 'add-round', component: AddRoundComponent },
	{ path: 'edit-round/:id', component: EditRoundComponent },
	{ path: 'view-rounds', component: ViewRoundsComponent },
	{ path: 'view-round/:id', component: ViewRoundComponent },
	{ path: 'add-track', component: AddTrackComponent },
	{ path: 'edit-track/:id', component: EditTrackComponent },
	{ path: 'view-tracks', component: ViewTracksComponent },
	{ path: 'view-track/:id', component: ViewTrackComponent },
	{ path: 'add-user', component: AddUserComponent },
	{ path: 'edit-user/:id', component: EditUserComponent },
	{ path: 'view-users', component: ViewUsersComponent },
	{ path: 'view-user/:id', component: ViewUserComponent },
	{ path: 'vote/:id', component: AddVoteSetComponent },
	{ path: 'add-vote-set', component: AddVoteSetComponent },
	{ path: 'edit-vote-set/:id', component: EditVoteSetComponent },
	{ path: 'view-vote-sets', component: ViewVoteSetsComponent },
	{ path: 'view-vote-set/:id', component: ViewVoteSetComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'analysis', component: AnalysisComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'reset-password', component: ResetPasswordComponent },
	{ path: 'rate', component: RateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
