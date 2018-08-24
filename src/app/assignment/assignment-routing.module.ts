import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AssignmentComponent } from "./assignment.component";

const assingmentRoutes: Routes = [
    { path: "assignment", component: AssignmentComponent }
]
@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(assingmentRoutes)],
    exports: [RouterModule]
})
export class AssignmentRoutingModule {

}