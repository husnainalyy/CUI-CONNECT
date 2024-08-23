    import EventForm from "@/components/shared/EventForm"
    import { auth } from "@clerk/nextjs/server";

    const CreateEvent = () => {
        const { sessionClaims } = auth();

        const userId = sessionClaims?.userId as string;
        return (
            <>
                <section className="bg-dotted-pattern bg-cover bg-center  py-5 md:py-5">
                    <h3 className="wrapper h3-bold text-center ">Create Event</h3>
                </section>

                <div className="wrapper mt-3 mb-8">
                    <EventForm userId={userId} type="Create" />
                </div>
            </>
        )
    }

    export default CreateEvent