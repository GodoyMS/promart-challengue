"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientUtility = void 0;
class UpdateClientUtility {
    updateClient(data) {
        const { _id, name, motherSurname, fatherSurname, email, bornDate } = data;
        return {
            _id,
            name,
            motherSurname,
            fatherSurname,
            email,
            bornDate,
            createdAt: new Date()
        };
    }
}
exports.UpdateClientUtility = UpdateClientUtility;
//# sourceMappingURL=update.utility.js.map