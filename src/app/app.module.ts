import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { ActionListComponent } from './components/action-list/action-list.component';
import { HomePageComponent } from './components/pages/home-page/home-page.component';
import { RecruitmentRequestPageComponent } from './components/pages/recruitment-request-page/recruitment-request-page.component';
import { ViewRequestPageComponent } from './components/pages/recruitment-request-page/view-request-page/view-request-page.component';
import { NavigateBarComponent } from './components/navigate-bar/navigate-bar.component';
import { BackBtnComponent } from './components/back-btn/back-btn.component';
import { RequestFormComponent } from './components/request-form/request-form.component';
import { CreateRequestPageComponent } from './components/pages/recruitment-request-page/create-request-page/create-request-page.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { GridComponent } from './components/grid/grid.component';
import { LoaderComponent } from './components/loader/loader.component';
import { OrganizationPoppupComponent } from './components/organization-poppup/organization-poppup.component';
import { ToStringPipe } from './components/pipes/to-string.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PopUpOrganizationsComponent } from './components/pop-up-organizations/pop-up-organizations.component';
import { AddBtnComponent } from './components/add-btn/add-btn.component';
import { ViewOneRequestPageComponent } from './components/pages/recruitment-request-page/view-one-request-page/view-one-request-page.component';
import { FormRequestComponent } from './components/form-request/form-request.component';
import { CustomizeButtonComponent } from './components/customize-button/customize-button.component';
import { CandidatePageComponent } from './components/pages/candidate-page/candidate-page.component';
import { CreateCandidatePageComponent } from './components/pages/candidate-page/create-candidate-page/create-candidate-page.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AttachFileComponent } from './components/attach-file/attach-file.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { ClassifyPageComponent } from './components/pages/classify-page/classify-page.component';
import { SystemCategoriesPageComponent } from './components/pages/classify-page/system-categories-page/system-categories-page.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditBtnComponent } from './components/edit-btn/edit-btn.component';
import { CancelBtnComponent } from './components/cancel-btn/cancel-btn.component';
import { SubmitBtnComponent } from './components/submit-btn/submit-btn.component';
import { RejectBtnComponent } from './components/reject-btn/reject-btn.component';
import { JwtInterceptor } from './helpers/tokenExpired.intercepter';
import { TitleCategoryPageComponent } from './components/pages/classify-page/title-category-page/title-category-page.component';
import { PositionCategoiresPageComponent } from './components/pages/classify-page/position-categoires-page/position-categoires-page.component';
import { HistoryComponent } from './components/history/history.component';
import { StepComponent } from './components/step/step.component';
import { ShowPdfFileComponent } from './components/show-pdf-file/show-pdf-file.component';
import { InstitutePageComponent } from './components/pages/institute-page/institute-page.component';
import { PositionInOrgComponent } from './components/pages/institute-page/position-in-org/position-in-org.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { ViewOrganizationComponent } from './components/pages/institute-page/view-organization/view-organization.component';
import { InstituteForOrganizationComponent } from './components/pages/institute-page/institute-for-organization/institute-for-organization.component';
import { PopupEmployeeComponent } from './components/popup-employee/popup-employee.component';
import { GeneralInfComponent } from './components/general-inf/general-inf.component';
import { ProfileCategoryPageComponent } from './components/pages/profile-category-page/profile-category-page.component';
import { ProfileInstitutePageComponent } from './components/pages/profile-institute-page/profile-institute-page.component';
import { ContractCategoryPageComponent } from './components/pages/profile-category-page/contract-category-page/contract-category-page.component';
import { HrInchangeComponent } from './components/hr-inchange/hr-inchange.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { ViewEmployeePagesComponent } from './components/pages/profile-institute-page/view-employee-pages/view-employee-pages.component';
import { EmployeeInformationComponent } from './components/pages/profile-institute-page/employee-information/employee-information.component';
import { SkillsAndExpComponent } from './components/skills-and-exp/skills-and-exp.component';
import { PopupForCandidateComponent } from './components/popup-for-candidate/popup-for-candidate.component';
import { ViewCandidatePageComponent } from './components/pages/candidate-page/view-candidate-page/view-candidate-page.component';
import { OverViewComponent } from './components/over-view/over-view.component';
import { ComboboxForCandidateComponent } from './components/combobox-for-candidate/combobox-for-candidate.component';
import { ListChildskillComponent } from './components/list-childskill/list-childskill.component';
import { AngularFireModule } from '@angular/fire/compat';
import { MatInputModule } from '@angular/material/input';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from 'src/environments/environment';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {MatTableModule} from '@angular/material/table';
import { LocationCategoriesPageComponent } from './components/pages/classify-page/location-categories-page/location-categories-page.component';
import { NationListComponent } from './components/pages/classify-page/location-categories-page/nation-list/nation-list.component';
import { ProvinceListComponent } from './components/pages/classify-page/location-categories-page/province-list/province-list.component';
import { DistrictListComponent } from './components/pages/classify-page/location-categories-page/district-list/district-list.component';
import { WardListComponent } from './components/pages/classify-page/location-categories-page/ward-list/ward-list.component';
import { ViewACandidatePageComponent } from './components/pages/candidate-page/view-a-candidate-page/view-a-candidate-page.component';
import { NavigationBarComponent } from './components/pages/candidate-page/view-a-candidate-page/navigation-bar/navigation-bar.component';
import { GeneralInfCandidateComponent } from './components/pages/candidate-page/view-a-candidate-page/general-inf-candidate/general-inf-candidate.component';
import { CvCandidateComponent } from './components/pages/candidate-page/view-a-candidate-page/cv-candidate/cv-candidate.component';
import { MatchingBtnComponent } from './components/matching-btn/matching-btn.component';
import { ConfirmMatchingComponent } from './components/confirm-matching/confirm-matching.component';
import { SafePipe } from './components/pipes/safe.pipe';
import { CandidateInRequestComponent } from './components/candidate-in-request/candidate-in-request.component';
import { EditCandidatePageComponent } from './components/pages/candidate-page/edit-candidate-page/edit-candidate-page.component';
import { ApplicationsComponent } from './components/pages/candidate-page/view-a-candidate-page/applications/applications.component';
import { InformaionComponent } from './components/pages/profile-institute-page/employee-information/informaion/informaion.component';
import { ContractComponent } from './components/pages/profile-institute-page/employee-information/contract/contract.component';
import { AvatarModule } from 'ngx-avatar';
import {MatRadioModule} from '@angular/material/radio';
import { EditCandidateFormComponent } from './components/pages/candidate-page/edit-candidate-page/edit-candidate-form/edit-candidate-form.component';
import { ViewContractComponent } from './components/pages/profile-institute-page/view-contract/view-contract.component';
import { FullCalendarModule } from '@fullcalendar/angular'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { RequestInApplicationsComponent } from './components/pages/candidate-page/view-a-candidate-page/applications/request-in-applications/request-in-applications.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CreateContractComponent } from './components/pages/profile-institute-page/create-contract/create-contract.component';
import { SettingComponent } from './components/setting/setting.component';
import { ForgotFormComponent } from './components/forgot-form/forgot-form.component';
import { InterviewResultComponent } from './components/interview-result/interview-result.component';
import { Grid2Component } from './components/grid2/grid2.component';
import { NotfoundPagesComponent } from './components/pages/notfound-pages/notfound-pages.component';
import { Loader2Component } from './components/loader2/loader2.component';
import { OfferFormComponent } from './components/offer-form/offer-form.component';
import { OnboardComponent } from './components/onboard/onboard.component'; // a plugin!
import { HighchartsChartModule } from 'highcharts-angular';
import { ReportPageComponent } from './components/pages/report-page/report-page.component';
import { ReportStep1Component } from './components/pages/report-page/report-step1/report-step1.component';
import { ReportStep3Component } from './components/pages/report-page/report-step3/report-step3.component';
import { RpNotPassComponent } from './components/pages/report-page/rp-not-pass/rp-not-pass.component';
import { ReportStep5Component } from './components/pages/report-page/report-step5/report-step5.component';
import { YesOrNoPipe } from './components/pipes/yes-or-no.pipe';
FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  
]);
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HeaderComponent,
    MenuComponent,
    ActionListComponent,
    HomePageComponent,
    RecruitmentRequestPageComponent,
    ViewRequestPageComponent,
    NavigateBarComponent,
    BackBtnComponent,
    RequestFormComponent,
    CreateRequestPageComponent,
    GridComponent,
    LoaderComponent,
    OrganizationPoppupComponent,
    ToStringPipe,
    PopUpOrganizationsComponent,
    AddBtnComponent,
    ViewOneRequestPageComponent,
    FormRequestComponent,
    CustomizeButtonComponent,
    CandidatePageComponent,
    CreateCandidatePageComponent,
    ProfileComponent,
    AttachFileComponent,
    ContactFormComponent,
    ClassifyPageComponent,
    SystemCategoriesPageComponent,
    EditBtnComponent,
    CancelBtnComponent,
    SubmitBtnComponent,
    RejectBtnComponent,
    TitleCategoryPageComponent,
    PositionCategoiresPageComponent,
    HistoryComponent,
    StepComponent,
    ShowPdfFileComponent,
    InstitutePageComponent,
    PositionInOrgComponent,
    ViewOrganizationComponent,
    InstituteForOrganizationComponent,
    PopupEmployeeComponent,
    GeneralInfComponent,
    ProfileCategoryPageComponent,
    ProfileInstitutePageComponent,
    ContractCategoryPageComponent,
    HrInchangeComponent,
    ViewEmployeePagesComponent,
    EmployeeInformationComponent,
    SkillsAndExpComponent,
    PopupForCandidateComponent,
    ViewCandidatePageComponent,
    OverViewComponent,
    ComboboxForCandidateComponent,
    ListChildskillComponent,
    LocationCategoriesPageComponent,
    NationListComponent,
    ProvinceListComponent,
    DistrictListComponent,
    WardListComponent,
    ViewACandidatePageComponent,
    NavigationBarComponent,
    GeneralInfCandidateComponent,
    CvCandidateComponent,
    MatchingBtnComponent,
    ConfirmMatchingComponent,
    SafePipe,
    CandidateInRequestComponent,
    EditCandidatePageComponent,
    ApplicationsComponent,
    InformaionComponent,
    ContractComponent,
    EditCandidateFormComponent,
    ViewContractComponent,
    RequestInApplicationsComponent,
    CalendarComponent,
    CreateContractComponent,
    SettingComponent,
    ForgotFormComponent,
    InterviewResultComponent,
    Grid2Component,
    NotfoundPagesComponent,
    Loader2Component,
    OfferFormComponent,
    OnboardComponent,
    ReportPageComponent,
    ReportStep1Component,
    ReportStep3Component,
    RpNotPassComponent,
    ReportStep5Component,
    YesOrNoPipe,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    MatCheckboxModule,
    SweetAlert2Module.forRoot(),
    PdfViewerModule,
    MatSelectCountryModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatInputModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatTableModule,
    MatInputModule,
    MatRadioModule,
    AvatarModule,
    FullCalendarModule,
    HighchartsChartModule
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
