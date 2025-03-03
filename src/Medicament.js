export class Medicament {
    constructor(data) {
        this._id = data.id;
        this._denomination = data.denomination;
        this._formepharmaceutique = data.formepharmaceutique;
        this._qte = data.qte;
        this._photo = data.photo;
    }

    get id() {
        return this._id;
    }

    get denomination() {
        return this._denomination;
    }

    get forme() {
        return this._formepharmaceutique;
    }

    get quantite() {
        return this._qte;
    }

    get photo() {
        return this._photo;
    }

    set denomination(nouvelleDenomination) {
        this._denomination = nouvelleDenomination;
    }

    set forme(nouvelleForme) {
        this._formepharmaceutique = nouvelleForme;
    }

    set quantite(nouvelleQuantite) {
        this._qte = Math.max(0, nouvelleQuantite);
    }

    set photo(nouvellePhoto) {
        this._photo = nouvellePhoto;
    }

    get description() {
        return `${this.forme} (${this.quantite} en stock)`;
    }
}