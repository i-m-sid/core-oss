export default function PrivacyPolicyPage() {
  return (
    <div className="legal-page min-h-screen bg-black text-[#d0d0d8] font-geist pt-24">
      <div className="mx-auto max-w-5xl px-10 py-12 bg-[#0d0d0f] rounded-xl border border-white/[0.06]">
        {/* Header */}
        <div className="mb-12">
          <p className="text-demo-md text-[#505058] mb-3">
            Last updated: April 8, 2026
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.5px] text-white">
            Privacy Policy
          </h1>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-demo-xl font-semibold text-white mb-3">
              Introduction and updates
            </h2>
            <p>
              This Privacy Policy details how Treaps Tech LLP and its affiliates
              ("Cube", "us", "our" or "we") process personal information (as
              defined below) collected, among other things, through our website
              at{" "}
              <a
                href="https://usecube.app"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                https://usecube.app
              </a>{" "}
              or our AI-powered workspace platform (the "Website" and "Platform"
              respectively).
            </p>
            <p className="mt-3">Our details are as follows:</p>
            <div className="mt-3 pl-4 border-l border-white/10 space-y-1 text-[#909096]">
              <p>Cube</p>
              <p>compliance@usecube.app</p>
            </div>
            <p className="mt-4">
              We may update our privacy policy from time to time by posting the
              new privacy policy on this page and updating the "Last updated"
              date. We encourage you to visit this page regularly to check for
              any changes.
            </p>
          </section>

          <section>
            <h2 className="text-demo-xl font-semibold text-white mb-3">
              What information we collect
            </h2>
            <p>
              We may collect personal information about you, being a customer or
              user of our Platform or Website ("you"), which means any
              information relating to an identified or identifiable natural
              person or "personal data", "personal information" or "personally
              identifiable information" as otherwise defined under applicable
              privacy laws ("Personal Information"):
            </p>

            <h3 className="text-[15px] font-semibold text-[#e0e0e8] mt-5 mb-2">
              For Website Users
            </h3>
            <p>
              We collect Personal Information that you provide to us voluntarily
              such as your email address, for instance when you communicate with
              us via the 'contact us' option on the Website, or register for
              updates or mailing list. In those cases, we will use such Personal
              Information to contact you. Such information may also include
              Personal Information that is shared with Cube by third parties,
              based on your consent to be contacted for marketing purposes.
            </p>
            <p className="mt-3">
              We collect specific types of connection details and information
              that may identify you, such as your IP address, log and usage data
              and exact device type and location.
            </p>

            <h3 className="text-[15px] font-semibold text-[#e0e0e8] mt-5 mb-2">
              For Prospects
            </h3>
            <p>
              We collect Personal Information we obtain from publicly available
              sources (e.g., professional networking sites), third-party data
              providers, or business partners about individuals who have not
              directly used or engaged our Platform, products and services but
              may have been identified as potential customers or relevant
              contacts.
            </p>
            <p className="mt-3">
              Such information includes basic contact details such as name,
              business email address, phone number, job title and other
              professionally relevant data.
            </p>

            <h3 className="text-[15px] font-semibold text-[#e0e0e8] mt-5 mb-2">
              Legal basis of Cube's Processing
            </h3>
            <p>
              Depending on the type of use as detailed below, Cube processes
              Personal Information based on the following legal basis:
            </p>
            <ul className="mt-3 space-y-2 pl-4">
              {[
                "Processing is necessary for the performance of a contract to which the data subject (as such term is defined under applicable law) is a party;",
                "Processing is necessary in order to take steps at the request of the data subject prior to entering into a contract;",
                "Processing is necessary for our legitimate interests and those of third parties for those purposes identified below;",
                "Processing is necessary to comply with Cube's legal obligations;",
                "Consent (with regards to marketing communications).",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-2 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-demo-xl font-semibold text-white mb-3">
              How Cube uses the information
            </h2>
            <p>
              We use the information in the manners described in this privacy
              policy. The information we collect, which may include your
              Personal Information, may be used by us for the following
              purposes:
            </p>
            <ul className="mt-3 space-y-2 pl-4">
              {[
                "To respond to inquiries and requests from our customers and users, or to provide you with further information about our Platform, products and services, as well as provide you with support;",
                "To generate anonymized and aggregated metadata;",
                "To provide our customers and users with Platform access and use, including support in connection therewith;",
                "To investigate and resolve disputes in connection with use of our Platform and Website;",
                "To detect and prevent fraudulent and illegal activity or any other type of activity that may jeopardize or negatively affect the Platform;",
                "To investigate violations and enforce our policies, and as required by law, regulation or other governmental authority;",
                "To detect and prevent harm to the rights, property or safety of Cube, our affiliates, our users, yourself or any third-party;",
                "To establish or exercise our rights to respond to legal claims, and to enforce and establish our intellectual property or other legal rights;",
                "To improve the performance of the Website and Platform;",
                "To identify, contact, and analyze prospective customers or leads for marketing, business outreach, or internal analytics;",
                "To develop new products and services by conducting analytics or research.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-2 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-demo-xl font-semibold text-white mb-3">
              With whom we share the information
            </h2>
            <p>
              We do not rent or sell any Personal Information. We may share
              Personal Information with the following recipients:
            </p>
            <ul className="mt-3 space-y-2 pl-4">
              {[
                "Our third-party vendors engaged in providing services in connection with the Platform, Website or sending marketing communications (the latter, with your consent);",
                "Our subsidiaries and affiliated companies;",
                "Auditors or advisers to Cube's business; and",
                "Any potential purchasers of, lenders to or investors in Cube.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-2 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-demo-xl font-semibold text-white mb-3">
              How we protect your information
            </h2>
            <p>
              We implement commercially reasonable technical, administrative,
              and organizational measures designed to protect your Personal
              Information from loss, misuse, and unauthorized access,
              disclosure, alteration, or destruction, including encryption and
              secure user management systems. However, no method of transmission
              over the Internet or electronic storage is 100% secure or
              error-free. Therefore, you should take special care in deciding
              what information you provide to the Platform.
            </p>
          </section>

          <section>
            <h2 className="text-demo-xl font-semibold text-white mb-3">
              Third party tracking technologies
            </h2>
            <p>
              We use cookies and other technologies in our services, including
              when you visit our Website or access our Platform. A "cookie" is a
              small piece of information that a website assigns to your device
              while you are viewing a website. Cookies are used for various
              purposes including allowing you to navigate between pages
              efficiently, enable automatic activation of certain features,
              remembering your preferences and making the interaction between
              you and our Platform quicker and easier.
            </p>
            <p className="mt-3">
              We also use Google Analytics to collect information about your use
              of the Platform and Website. Google Analytics collects the IP
              address assigned to you on the date you visit sites. We do not
              combine the information collected through the use of Google
              Analytics with personally identifiable information. Google's
              ability to use and share information collected by Google Analytics
              is restricted by the Google Analytics Terms of Service and the
              Google Privacy Policy.
            </p>
            <p className="mt-3">
              You may remove cookies by following the instructions of your
              device preferences. However, if you choose to disable cookies,
              some features of our Service may not operate properly.
            </p>
          </section>

          <section>
            <h2 className="text-demo-xl font-semibold text-white mb-3">
              International transfer
            </h2>
            <p>
              Because Cube operates globally, it may be necessary for us to
              transfer information, including Personal Information, to countries
              other than the one in which the information was collected. In
              these instances, we will transfer your data in accordance with the
              provisions of the applicable privacy legislation meant to
              safeguard the processing of your Personal Information.
            </p>
          </section>

          <section>
            <h2 className="text-demo-xl font-semibold text-white mb-3">
              For how long we retain the information
            </h2>
            <p>
              We retain the information that we collect from you for as long as
              it is necessary based on the purpose it was collected for and
              taking into account compliance with our legal obligations,
              resolving disputes and enforcing our rights. Retention periods
              will be determined taking into account the type of information
              that is collected and the purpose for which it is collected,
              bearing in mind the requirements applicable to the situation and
              the need to destroy outdated, unused information at the earliest
              reasonable time.
            </p>
          </section>

          <section>
            <h2 className="text-demo-xl font-semibold text-white mb-3">
              Your privacy rights
            </h2>
            <p>
              Certain jurisdictions provide data subjects with certain statutory
              rights to their Personal Information. Subject to exemptions
              provided by law, and with proper identification, you may have the
              right to:
            </p>
            <ul className="mt-3 space-y-2 pl-4">
              {[
                "Right to verify your Personal Information (to access, delete, change or update any Personal Information relating to you);",
                "Right to request that we erase Personal Information about you (subject to any other legal obligation that may require us to keep that information);",
                "Right to object to the processing of your Personal Information where our lawful basis is legitimate interest or direct marketing;",
                "Right to restrict us from processing Personal Information pertaining to you; and",
                "Right to export Personal Information in a portable format.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="mt-2 w-1 h-1 rounded-full bg-indigo-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4">
              If you wish to exercise any of these rights, please contact us at:{" "}
              <a
                href="mailto:compliance@usecube.app"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                compliance@usecube.app
              </a>
              .
            </p>
            <p className="mt-3">
              If you wish to raise a complaint on how we have handled your
              Personal Information, please contact us directly at:{" "}
              <a
                href="mailto:compliance@usecube.app"
                className="text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                compliance@usecube.app
              </a>
              .
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-white/6 text-demo-md text-[#505058]">
          <p>
            Questions? Contact us at{" "}
            <a
              href="mailto:compliance@usecube.app"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              compliance@usecube.app
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
