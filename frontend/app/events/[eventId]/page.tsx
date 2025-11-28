const EventDetails = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = await params;
  return (
    <section>
      <p>{eventId}</p>
    </section>
  );
};

export default EventDetails;
