import { CustomPageHeader } from "@/components";

// The app's own home screen, a blank starting point. Replace it with the first real screen.
const HomeScreen = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomPageHeader />

      <section className="page-container flex min-h-[calc(100svh-var(--page-header-height))] flex-col items-center justify-center text-center">
        <h1 className="title text-display text-balance">Home</h1>
        <p className="subtitle mt-md max-w-xl text-body-lg text-muted-foreground">
          This is your app's home screen. Replace it with the first real
          screen, it lives in src/screens/home.
        </p>
      </section>
    </main>
  );
};

export default HomeScreen;
