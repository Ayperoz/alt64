import { getIO } from "../../libs/socket";
import Contact from "../../models/Contact";
import Ticket from "../../models/Ticket";
import CreateMessageService from "../MessageServices/CreateMessageService";
import { generateVCard, IMessageReceived } from "./ReceivedWhatsApp";

const getTimestampMessage = (msgTimestamp: any) => {
    return msgTimestamp * 1
}

const verifyMessageOficial = async (
    message: IMessageReceived,
    ticket: Ticket,
    contact: Contact,
    companyId: number,
    fileName: string,
    fromNumber: string,
    data: any
) => {

    let bodyMessage: any = message.text;

    if (message.type === "contacts" && Array.isArray(data.message?.text?.contacts)) {
        data.message.text.contacts.forEach(contact => {
            bodyMessage = generateVCard(contact);
            console.log(bodyMessage);
        });
    }

    const messageData = {
        wid: message.idMessage,
        ticketId: ticket.id,
        contactId: contact.id,
        body: message.type === "contacts" ? bodyMessage : !!message.text ? message.text : '',
        fromMe: false,
        mediaType: message.type === "contacts" ? "contactMessage" : data.message.type,
        mediaUrl: fileName,
        // read: false,
        read: false,
        quotedMsgId: null,
        // ack: 2,
        ack: 0,
        channel: 'whatsapp_oficial',
        remoteJid: `${fromNumber}@s.whatsapp.net`,
        participant: null,
        dataJson: JSON.stringify(data),
        ticketTrakingId: null,
        isPrivate: false,
        createdAt: new Date(
            Math.floor(getTimestampMessage(message.timestamp) * 1000)
        ).toISOString(),
        ticketImported: ticket.imported,
        isForwarded: false
    };

    const io = getIO();

    io.of(String(ticket.companyId))
        .emit(`company-${ticket.companyId}-appMessage`, {
            action: "create",
            message: messageData,
            ticket: ticket,
            contact: ticket.contact
        });

    await CreateMessageService({ messageData, companyId: companyId });
}

export default verifyMessageOficial;