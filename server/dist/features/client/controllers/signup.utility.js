"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpClientUtility = void 0;
const clientDocument_interface_1 = require("@client/interfaces/clientDocument.interface");
class SignUpClientUtility {
    signUpClient(data) {
        const { _id, name, motherSurname, fatherSurname, email, bornDate } = data;
        return {
            _id,
            name,
            motherSurname,
            fatherSurname,
            email,
            bornDate,
            state: clientDocument_interface_1.CLIENTSTATUS.PROSPECTO,
            active: true,
            createdAt: new Date()
        };
    }
}
exports.SignUpClientUtility = SignUpClientUtility;
//# sourceMappingURL=signup.utility.js.map