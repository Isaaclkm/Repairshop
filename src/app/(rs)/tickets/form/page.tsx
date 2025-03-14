import { getCustomer } from "@/lib/queries/getCustomers";
import { getTickets } from "@/lib/queries/getTickets";
import { BackButton } from "@/app/components/BackButton";
import * as Sentry from "@sentry/nextjs"
import TicketForm from "@/app/(rs)/tickets/form/TicketForm";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

import { Users, init as kindeInit } from "@kinde/management-api-js"
import { title } from "process";

export async function generateMetaData({
    searchParams,
}: {
    searchParams: Promise<{ [key:string]: string | undefined }>

}) {
    const { customerId, ticketId} = await searchParams

    if(!customerId && !ticketId) return {
        title: 'Missing Ticket Id or Customer ID'
    }

    if(customerId) return {
        title: `New Ticket for Customer #${customerId}`
    }

    if(ticketId) return {
        title:  `Edit Ticket #${ticketId}`
    }
}

export default async function TicketFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key:string]: string | undefined }>

}) {
    try {
        const { customerId, ticketId } = await searchParams

        if(!customerId && !ticketId){
            return (
                <>
                    <h2 className="text-2xl mb-2">
                    Ticket ID and Customer ID required to load ticket form
                    </h2>
                    <BackButton title="Go Back" variant="default"/>
                </>
            )
        }

        const { getPermission, getUser } = getKindeServerSession()

        const [managerPermission, user] = await Promise.all([
            getPermission("manager"),
            getUser(),
        ])

        const isManager = managerPermission?.isGranted

        if(customerId) {
            
           const customer = await getCustomer(parseInt(customerId)) 
           
           if(!customer){
            return (
                <>
                    <h2 className="text-2xl mb-2">
                        Customer ID #{customerId} not found 
                    </h2>
                    <BackButton title="Go Back" variant="default"/>
                </>
            )
           }

           if(!customer.active){
            return (
                <>
                    <h2 className="text-2xl mb-2">
                        Customer ID #{customerId} is not active.
                    </h2>
                    <BackButton title="Go Back" variant="default"/>
                </>
            )

           }

           if(isManager){
                kindeInit()
                const { users } = await Users.getUsers()

                const techs = users ? users.map(user => ({id: user.email!, description: user.email! })):[]

                return <TicketForm customer={customer} techs={techs}/>
           }else {
                return <TicketForm customer={customer} />
           }           
        }

        if(ticketId) {
            const ticket = await getTickets(parseInt(ticketId))
            if(!ticket){
                return(
                    <>
                        <h2 className="text-2xl mb-2">Ticket Id # {ticketId} not found</h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                )
            }
            console.log(ticket.customerId)
            const customer = await getCustomer(ticket.customerId)

            if(isManager){
                kindeInit()
                const { users } = await Users.getUsers()

                const techs = users ? users.map(user => ({id: user.email!, description: user.email! })):[]

                return <TicketForm customer={customer} ticket={ticket} techs={techs}/>
           }else {
                const isEditable = user.email?.toLocaleLowerCase() === ticket.tech.toLowerCase()
                return <TicketForm customer={customer} ticket={ticket} isEditable= {isEditable} />
           } 

           }
    } catch (e) {
        if (e instanceof Error){
            Sentry.captureException(e)
            throw e
        }
    }

}