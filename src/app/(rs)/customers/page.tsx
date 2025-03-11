import CustomerSearch from "@/app/(rs)/customers/CustomerSearch"
import { getCustomer } from "@/lib/queries/getCustomers"
import { getCustomersSearchResults } from "@/lib/queries/getCustomersSearchResults"
import * as Sentry from "@sentry/nextjs"
import CustomerTable from "@/app/(rs)/customers/CustomerTable"

export const metadata = {
    title: "Tickets",
}

export default async function Customers({
    searchParams,
}: {
    searchParams: Promise<{ [key:string]: string | undefined }>

}){
    const { searchText } = await searchParams

    if(!searchText) return <CustomerSearch/>

    const span = Sentry.startInactiveSpan({
        name: 'getCustomerSearchResults-2'
    })
    const results = await getCustomersSearchResults(searchText)
    span.end()

    return (
        <>
            <CustomerSearch />
            {results.length? <CustomerTable data={results} />: (
              <p className="mt-4">No results found</p>      
            )}
        </>
    )

    //return results
}