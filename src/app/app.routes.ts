import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MasterclassesComponent } from './pages/masterclasses/masterclasses.component';
import { MentorDashboardComponent } from './pages/mentor-dashboard/mentor-dashboard.component';
import { MasterclassDetailComponent } from './pages/masterclass-detail/masterclass-detail.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { BusinessComponent } from './pages/business/business.component';
import { GiftsComponent } from './pages/gifts/gifts.component';
import { MembershipComponent } from './pages/membership/membership.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'masterclasses', component: MasterclassesComponent },
  { path: 'masterclasses/:id', component: MasterclassDetailComponent },
  { path: 'mentor/dashboard', component: MentorDashboardComponent },
  { path: 'carrinho', component: CartComponent },
  { path: 'lista-desejos', component: WishlistComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'empresas', component: BusinessComponent },
  { path: 'presentes', component: GiftsComponent },
  { path: 'planos', component: MembershipComponent },
  { path: 'perfil', component: ProfileComponent },
  { path: 'configuracoes', component: SettingsComponent },
  { path: '**', redirectTo: '' }
];

