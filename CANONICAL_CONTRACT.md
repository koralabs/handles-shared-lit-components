# handles-shared-lit-components canonical contract

I am the shared Lit web-component library (`@koralabs/handles-shared-lit-components`): buttons, popups, wallet and Handle pickers used by the front ends. I display what the app gives me and raise events.

1. **No component signs, submits or reads wallet secrets.** Wallet components render the names and icons the app passes in and emit events.
2. **Components show the data they are given, unaltered.** Handle names and wallet details are displayed as passed in, with no re-derivation.
3. **Events carry what the user chose.** Selection and input events report the user's actual choice.
4. **Chain correctness of anything displayed is the calling app's responsibility.**
