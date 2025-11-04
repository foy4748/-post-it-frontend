type propType = {
  params: Promise<{
    threadId: string;
  }>;
};

async function SingleThreadPage({ params }: propType) {
  const p = await params;
  return (
    <div>
      <p>{p.threadId}</p>
    </div>
  );
}

export default SingleThreadPage;
