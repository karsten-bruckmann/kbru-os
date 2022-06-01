import { Component } from "@angular/core";
import { ShipmentFormBuilder } from "../../core/form-builders/shipment/shipment.form-builder";
import { Store } from "@ngrx/store";
import {
  userLoggedIn,
  userLoggedOut,
} from "../../core/state/user-data/user-data.actions";
import { userDataSelector } from "../../core/state/user-data/user-data.selectors";
import { firstValueFrom } from "rxjs";
import { shipmentDataChangedAction } from "../../core/state/shipment-data/shipment-data.actions";
import { ShipmentData } from "../../core/state/shipment-data/shipment-data.model";

@Component({
  selector: "kbru-shipment",
  templateUrl: "./shipment.component.html",
  styleUrls: ["./shipment.component.scss"],
})
export class ShipmentComponent {
  constructor(
    private store$: Store,
    private formBuilder: ShipmentFormBuilder
  ) {}

  public form$ = this.formBuilder.form;

  public user$ = this.store$.select(userDataSelector);

  public login(): void {
    this.store$.dispatch(
      userLoggedIn({
        userData: {
          fullName: "Max Mustermann",
          zipCode: "12435",
          city: "Berlin",
          street: "An der Spree 64",
        },
      })
    );
  }

  public logout(): void {
    this.store$.dispatch(userLoggedOut());
  }

  public async submit(): Promise<void> {
    const form = await firstValueFrom(this.form$);
    const userData = await firstValueFrom(this.user$);
    const data: ShipmentData = {
      ...form.value,
      address: {
        ...form.value.address,
        ...(userData ?? {}),
      },
    };
    this.store$.dispatch(shipmentDataChangedAction({ data }));
  }
}
