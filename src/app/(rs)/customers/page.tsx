import CustomerSearch from "@/app/(rs)/customers/CustomerSearch"
import { getCustomer } from "@/lib/queries/getCustomers"
import { getCustomersSearchResults } from "@/lib/queries/getCustomersSearchResults"

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

    const results = await getCustomersSearchResults(searchText)

    return (
        <>
            <CustomerSearch/>
            <p>{JSON.stringify(results)}</p>
        </>
    )

    //return results
}