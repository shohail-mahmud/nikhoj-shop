import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TermsPrivacy = () => {
  const [termsOfService, setTermsOfService] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [countryInfo, setCountryInfo] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .in("key", ["terms_of_service", "privacy_policy", "country_info"]);

    if (data) {
      data.forEach((setting) => {
        if (setting.key === "terms_of_service") setTermsOfService(setting.value);
        if (setting.key === "privacy_policy") setPrivacyPolicy(setting.value);
        if (setting.key === "country_info") setCountryInfo(setting.value);
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Terms & Privacy
          </h1>
          <p className="text-center text-muted-foreground mb-12">
            Please read our terms of service and privacy policy carefully
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="terms" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                Terms of Service / Purchase Policy
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground whitespace-pre-line pt-4 space-y-4">
                {termsOfService.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className={paragraph.includes('non-refundable') || paragraph.includes('Bangladesh') ? 'font-semibold text-foreground' : ''}>
                    {paragraph}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                Privacy Policy
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground whitespace-pre-line pt-4 space-y-4">
                {privacyPolicy.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className={paragraph.includes('never sell') ? 'font-semibold text-foreground' : ''}>
                    {paragraph}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="location" className="border rounded-lg px-6">
              <AccordionTrigger className="text-xl font-semibold hover:no-underline">
                Location & Operations
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pt-4">
                <p className="font-semibold text-foreground">{countryInfo}</p>
                <p className="mt-4">
                  All products are shipped from Bangladesh. Orders are processed manually through Instagram to ensure personalized service and quality control.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 p-6 bg-accent/20 rounded-lg border">
            <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
            <p className="text-muted-foreground">
              If you have any questions about our terms, privacy policy, or need assistance with your order, 
              please contact us via{" "}
              <a 
                href="https://instagram.com/ruhama_islamm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline font-semibold"
              >
                Instagram @ruhama_islamm
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPrivacy;
