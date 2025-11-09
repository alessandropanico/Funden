export interface ResponseRequestGenerateSmsCode {
    entity: Entity;
}

export interface Entity {
    id:              string;
    clientId:        string;
    status:          string;
    statusCode:      null;
    from:            string;
    country:         string;
    to:              string;
    normalizedTo:    string;
    mccMnc:          null;
    charsCount:      number;
    messagesCount:   number;
    encoding:        string;
    unicode:         boolean;
    allowUnicode:    boolean;
    charged:         boolean;
    pricePerSms:     number;
    priceUser:       number;
    scheduledAt:     null;
    sentAt:          null;
    deliveredAt:     null;
    audienceContact: null;
    metadata:        Metadata;
}

export interface Metadata {
    organizationName: string;
    organizationId:   string;
    sendName:         string;
    sendId:           string;
}
