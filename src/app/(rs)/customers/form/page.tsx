import { BackButton } from "@/app/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomers";

export default async function CustomerFormPage({
    searchParams,
}: {
    searchParams: Promise<{ [key:string]: string | undefined }>

}) {
    try {

        const { customerId } = await searchParams

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

            //put customer form component
        } else {
            // new customer form page
        }


    }catch (e) {
        if (e instanceof Error){
            throw e
        }
    }
}