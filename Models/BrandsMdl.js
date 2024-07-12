class Brands {
    constructor({
        Id, OrgId, Name, Description, IsActive, CreatedBy, UpdatedBy, Code
    }) {
        this.Id = Id;
        this.OrgId = OrgId;
        this.Name = Name;
        this.Description = Description;
        this.IsActive = IsActive;
        this.CreatedBy = CreatedBy;
        this.UpdatedBy = UpdatedBy;
        this.Code = Code;
    }
}

module.exports = {
    Brands
};
