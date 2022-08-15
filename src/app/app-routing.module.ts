import { ViewRequestPageComponent } from './components/pages/recruitment-request-page/view-request-page/view-request-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RecruitmentRequestPageComponent } from './components/pages/recruitment-request-page/recruitment-request-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { CreateRequestPageComponent } from './components/pages/recruitment-request-page/create-request-page/create-request-page.component';
import { AuthorizeGuard } from './services/guard/authorize.guard';
import { ViewOneRequestPageComponent } from './components/pages/recruitment-request-page/view-one-request-page/view-one-request-page.component';
import { CandidatePageComponent } from './components/pages/candidate-page/candidate-page.component';
import { CreateCandidatePageComponent } from './components/pages/candidate-page/create-candidate-page/create-candidate-page.component';
import { ClassifyPageComponent } from './components/pages/classify-page/classify-page.component';
import { SystemCategoriesPageComponent } from './components/pages/classify-page/system-categories-page/system-categories-page.component';
import { TitleCategoryPageComponent } from './components/pages/classify-page/title-category-page/title-category-page.component';
import { PositionCategoiresPageComponent } from './components/pages/classify-page/position-categoires-page/position-categoires-page.component';
import { InstitutePageComponent } from './components/pages/institute-page/institute-page.component';
import { PositionInOrgComponent } from './components/pages/institute-page/position-in-org/position-in-org.component';
import { ViewOrganizationComponent } from './components/pages/institute-page/view-organization/view-organization.component';
import { InstituteForOrganizationComponent } from './components/pages/institute-page/institute-for-organization/institute-for-organization.component';
import { ProfileCategoryPageComponent } from './components/pages/profile-category-page/profile-category-page.component';
import { ContractCategoryPageComponent } from './components/pages/profile-category-page/contract-category-page/contract-category-page.component';
import { ProfileInstitutePageComponent } from './components/pages/profile-institute-page/profile-institute-page.component';
import { ViewEmployeePagesComponent } from './components/pages/profile-institute-page/view-employee-pages/view-employee-pages.component';
import { EmployeeInformationComponent } from './components/pages/profile-institute-page/employee-information/employee-information.component';
import { ViewCandidatePageComponent } from './components/pages/candidate-page/view-candidate-page/view-candidate-page.component';
import { NationListComponent } from './components/pages/classify-page/location-categories-page/nation-list/nation-list.component';
import { ProvinceListComponent } from './components/pages/classify-page/location-categories-page/province-list/province-list.component';
import { DistrictListComponent } from './components/pages/classify-page/location-categories-page/district-list/district-list.component';
import { WardListComponent } from './components/pages/classify-page/location-categories-page/ward-list/ward-list.component';
import { LocationCategoriesPageComponent } from './components/pages/classify-page/location-categories-page/location-categories-page.component';
import { ViewACandidatePageComponent } from './components/pages/candidate-page/view-a-candidate-page/view-a-candidate-page.component';
import { GeneralInfCandidateComponent } from './components/pages/candidate-page/view-a-candidate-page/general-inf-candidate/general-inf-candidate.component';
import { CvCandidateComponent } from './components/pages/candidate-page/view-a-candidate-page/cv-candidate/cv-candidate.component';
import { EditCandidatePageComponent } from './components/pages/candidate-page/edit-candidate-page/edit-candidate-page.component';
import { ApplicationsComponent } from './components/pages/candidate-page/view-a-candidate-page/applications/applications.component';
import { InformaionComponent } from './components/pages/profile-institute-page/employee-information/informaion/informaion.component';
import { ContractComponent } from './components/pages/profile-institute-page/employee-information/contract/contract.component';
import { ViewContractComponent } from './components/pages/profile-institute-page/view-contract/view-contract.component';
import { RequestInApplicationsComponent } from './components/pages/candidate-page/view-a-candidate-page/applications/request-in-applications/request-in-applications.component';
import { CreateContractComponent } from './components/pages/profile-institute-page/create-contract/create-contract.component';
import { SettingComponent } from './components/setting/setting.component';
import { ForgotFormComponent } from './components/forgot-form/forgot-form.component';
import { NotfoundPagesComponent } from './components/pages/notfound-pages/notfound-pages.component';
import { ReportPageComponent } from './components/pages/report-page/report-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    canActivate: [AuthorizeGuard],
    children: [
      { path: 'baocao', component: ReportPageComponent },
      {
        path: 'thietlapnguoidung',
        component: SettingComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'yeucautuyendung',
        component: RecruitmentRequestPageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'yeucautuyendung/xemyeucau',
        component: ViewRequestPageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'yeucautuyendung/taoyeucau',
        component: CreateRequestPageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'yeucautuyendung/xemyeucau/:id/:page',
        component: ViewOneRequestPageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'ungvien',
        component: CandidatePageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'ungvien/taoungvien',
        component: CreateCandidatePageComponent,
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'ungvien/suaungvien',
        component: EditCandidatePageComponent,
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'ungvien/xemungvien',
        component: ViewCandidatePageComponent,
        // canActivate: [AuthorizeGuard],
      },
      {
        path: 'ungvien/xemungvien',
        component: ViewACandidatePageComponent,
        // canActivate: [AuthorizeGuard],
        children: [
          {
            path: 'info',
            component: GeneralInfCandidateComponent,
          },
          { path: 'cv', component: CvCandidateComponent },
          { path: 'applications', component: ApplicationsComponent },
          {
            path: 'applications/request',
            component: RequestInApplicationsComponent,
          },
        ],
      },
      {
        path: 'phanloaitochuc',
        component: ClassifyPageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'thietlaptochuc',
        component: InstitutePageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'phanloaitochuc/thamsohethong',
        component: SystemCategoriesPageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'phanloaitochuc/danhmucdiadiem',
        component: LocationCategoriesPageComponent,
        canActivate: [AuthorizeGuard],
        children: [
          {
            path: 'nations',
            component: NationListComponent,
          },
          {
            path: 'provinces',
            component: ProvinceListComponent,
          },
          {
            path: 'districts',
            component: DistrictListComponent,
          },
          {
            path: 'wards',
            component: WardListComponent,
          },
        ],
      },
      {
        path: 'phanloaitochuc/danhmuchucdanh',
        component: TitleCategoryPageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'phanloaitochuc/danhmucvitricongviec',
        component: PositionCategoiresPageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'thietlaptochuc/vitricongviec',
        component: PositionInOrgComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'thietlaptochuc/xemtochuc',
        component: ViewOrganizationComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'thietlaptochuc/tochuc',
        component: InstituteForOrganizationComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'danhmuchoso',
        component: ProfileCategoryPageComponent,
        canActivate: [AuthorizeGuard],
      },

      {
        path: 'danhmuchoso/hopdong',
        component: ContractCategoryPageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'danhmuchoso/',
        component: ContractCategoryPageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'thietlaphoso',
        component: ProfileInstitutePageComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'thietlaphoso/nhanvien',
        component: ViewEmployeePagesComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'thietlaphoso/hopdong',
        component: ViewContractComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'thietlaphoso/taohopdong',
        component: CreateContractComponent,
        canActivate: [AuthorizeGuard],
      },
      {
        path: 'thietlaphoso/chitietnhanvien',
        component: EmployeeInformationComponent,
        canActivate: [AuthorizeGuard],
        children: [
          {
            path: 'info',
            component: InformaionComponent,
            canActivate: [AuthorizeGuard],
          },
          {
            path: 'contract',
            component: ContractComponent,
            canActivate: [AuthorizeGuard],
          },
        ],
      },
    ],
  },

  { path: 'register', component: RegisterPageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'forgot', component: ForgotFormComponent },
  { path: '404', component: NotfoundPagesComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
