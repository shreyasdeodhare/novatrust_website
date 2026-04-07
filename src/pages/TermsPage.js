import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const TermsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src="/nt-logo-2024.svg" alt="NovaTrust Logo" className="w-10 h-10 rounded-full bg-primary-500 object-cover" />
            <div>
              <h1 className="ml-3 text-xl font-bold text-neutral-900">Novatrust</h1>
              <p className="ml-3 text-xs text-neutral-600">Chits and Finance Private Ltd</p>
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            <Link to="/about-us" className="text-neutral-600 hover:text-primary-600 transition-colors">
              About Us
            </Link>
            <Link to="/schemes" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Schemes
            </Link>
            <Link to="/about-chit-funds" className="text-neutral-600 hover:text-primary-600 transition-colors">
              About Chit Funds
            </Link>
            <Link to="/contact" className="text-neutral-600 hover:text-primary-600 transition-colors">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-neutral-900 mb-6">Terms and Conditions</h1>

            <div className="prose prose-lg max-w-none">
              <p className="font-bold">Last Updated: {new Date().toLocaleDateString()}</p>

              <h2>Novatrust Chits and Finance Private Ltd Rules</h2>

              <ol className="list-decimal pl-5 space-y-2">
                <li>To become a member or a guarantor in Novatrust Chits and Finance Private Ltd, one must be at least 20 years old.</li>
                <li>A person who wants to join the group must submit a photo, Aadhaar card, ration card, and PAN card, and can join by paying an advance amount of ₹1000.</li>
                <li>A member can hold any number of tickets in a single group.</li>
                <li>Members who join the chit group will be issued a registered Form No. 8 agreement for the chit value by Novatrust Chits and Finance Private Ltd, as per the 1982 Chit Fund Act.</li>
                <li>Before the group begins, Novatrust Chits and Finance Private Ltd provides a list of 20 individuals registered with the government to the group members through both online and offline methods.</li>
                <li>Novatrust Chits and Finance Private Ltd provides group members with a receipt for the fixed deposit made as collateral in the name of the group for its security, as per the Chit Fund Act, 1982.</li>
                <li>Novatrust Chits and Finance Private Ltd will operate the group only after providing the required security to the registrar and obtaining approval from the joint chit registrar.</li>
                <li>The installment amount must be paid one day before the chit date. Those who do so will be given a bonus ranging from ₹100 to ₹150.</li>
                <li>Members must collect a receipt immediately after paying their installment. If they claim to have paid without a receipt, the company will not be held responsible.</li>
                <li>If a chit group member wishes to receive the chit amount within six months, they must inform the company before joining the group. If they wish to receive it after seven months, they must give at least one month's prior notice.</li>
                <li>New members joining the chit group must have a minimum CIBIL score of 750.</li>
                <li>To receive the chit amount, two guarantors are required: (A) a Novatrust Chits and Finance Private Ltd chit group member and (B) a government employee. The documents of both the member and the guarantors must be of the same type.</li>
                <li>A member receiving the chit amount who provides the required deposit or registers a mortgage for the remaining months does not need to submit any additional documents or guarantees.</li>
                <li>Members who wish to receive the chit amount after 12 months must provide some form of guarantee. For those receiving it after 15 months, submitting their own documents will be sufficient.</li>
                <li>The member who is going to receive the chit amount can get the amount on the very next day after completing the required security procedures for the remaining monthly installments.</li>
                <li>Novatrust Chits and Finance Private Ltd members can avail insurance for their chit value. The premium will be 1% of the chit value, and this offer is applicable to individuals between 20 and 50 years of age.</li>
                <li>The foreman commission is 6% of the chit amount, and this commission is included in the monthly installment.</li>
                <li>Novatrust Chits and Finance Private Ltd charges commission on the chit value of individual members, but does not charge commission on the total amount of the chit group.</li>
                <li>The foreman commission and service charges cover the subscriber's investment security fee, government registration stamp duty, online service charges for daily and monthly installment payments, agreement fee for chit amount disbursement, and 24/7 website-based account statement maintenance service charges.</li>
                <li>Documents to be submitted by the auction winning customer: Proof of ID, Proof of Address, Proof of Income, Detailed documents of own house and 3 bank cheque for security will be mandatory. Also 2 guarantors will be required and their documents will be the same.</li>
                <li>If a member delays the payment of their pending chit installment within three days from the chit date, a 2% penalty must be paid. Similarly, if the delay extends to seven days, a 2% penalty or interest will be charged.</li>
                <li>If a member's cheque is bounced by the bank for any reason, a bounce charge of ₹500 will be collected.</li>
                <li>If a member keeps their chit installment pending for up to five days from the chit date, they will not be eligible to receive the chit amount for the next six months.</li>
                <li>If a member wishes to cancel their ticket and transfer it to a new subscriber, a 1% processing fee will be charged on the chit value.</li>
                <li>If a member cancels their ticket and later joins a new group, they will be eligible to receive the chit amount only after six months.</li>
                <li>As per the agreement between the company and the customer, if the chit installment remains unpaid for up to 15 days from the chit date, the company has the right to cancel the member's ticket without their consent.</li>
                <li>If a member cancels their ticket in a group, a 6% company commission will be deducted from the chit value, and the remaining amount will be given to the subscriber only after the chit group's term ends.</li>
                <li>As per the agreement, if a member who has taken the chit amount fails to pay the chit installments for two consecutive months, they will not be eligible to receive any rebate amount for the remaining monthly installments.</li>
                <li>If a member who has taken the chit amount fails to pay their pending dues for more than two months, legal action will be taken under the 1982 Chit Fund Act. The concerned subscriber and guarantors will be responsible for bearing all legal expenses.</li>
                <li>After the chit group ends, the subscriber can collect all their related documents.</li>
                <li>The company will not disclose any subscriber's transactions to any other person without the consent of the concerned subscriber.</li>
                <li>All guarantees accepted by the Novatrust Chits and Finance Private Ltd management must be in written form only.</li>
              </ol>

              <h2 className="mt-6">Benefits:</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Cost of intermediation is the lowest.</li>
                <li>Tax Free Dividend.</li>
                <li>Easy Accessibility.</li>
                <li>User-friendly service.</li>
                <li>No Periodic interest hikes.</li>
                <li>Exit Options with nominal charges.</li>
                <li>No any Tax Deducted from chit payment in our company.</li>
                <li>Our company charges commission on customer chit value but does not charge commission on the total amount of the chit group.</li>
                <li>Chit fund is much easier, simpler, faster and cheaper than borrowing from a bank.</li>
              </ol>

              <h2 className="mt-6">Why Invest with us?</h2>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Customer can obtain their payments at any time (24 X 7 services)</li>
                <li>Customer can pay their chit amount on daily / weekly basis.</li>
                <li>100 % guarantee for customers money.</li>
                <li>The internal customer of group can check whether the company has paid the amount of the chit winner.</li>
                <li>Online Chit Group Statements & Videos facilities</li>
                <li>Transparency through Registration.</li>
                <li>Customer can get 50% fund of their's chit paid amount with lowest interest.</li>
                <li>Hassle-free documentation.</li>
              </ol>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white font-bold text-sm">
                  NT
                </div>
                <span className="ml-2 text-lg font-bold text-neutral-900">Novatrust</span>
              </div>
              <p className="text-sm text-neutral-500 mt-1">Secure, Transparent Chits and Finance Services</p>
            </div>

            <div className="flex space-x-6">
              <Link to="/terms" className="text-primary-600 font-medium">
                Terms of Service
              </Link>
              <a href="#" className="text-neutral-500 hover:text-primary-600">
                Privacy Policy
              </a>
              <Link to="/contact" className="text-neutral-500 hover:text-primary-600">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-200 text-center">
            <p className="text-neutral-500 text-sm">
              &copy; {new Date().getFullYear()} Novatrust Chits and Finance Private Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsPage;
