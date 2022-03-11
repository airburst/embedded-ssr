import { QuoteFormData } from "../../types";

export interface RfqProps {
  reference?: string;
  created_at?: string;
  rfq_url?: string;
  error?: string;
  message?: string;
};

const defaultRequest = {
  vertical: "Business",
  questionnaire: {
    name: "Business",
    version: 1,
  },
  quoting_operation: "new_business",
  proposal: {
    "Policy start date": "02/02/2022",
    site: "simplybusiness",
    primary_trade: "Painter & decorator",
    have_secondary_trade: "no",
    uk_postcode: "AB30 0SH",
    business_type: "Sole trader",
    years_trading: "3-4 years",
    annual_turnover: "50000",
    have_employees: "yes",
    total_employees: "5",
    clerical_employees: "1",
    temporary_workers: "no",
    use_subcontractors: "no",
    include_buildings: "no",
    pl_cover_limit: "1000000",
    legal_expenses_sum_insured: "0",
    excess_sum_insured: "0",
    personal_accident: "no",
    include_tools: "no",
    include_contents: "no",
    include_stock: "no",
    include_contract_works: "no",
    include_own_plant: "no",
    include_hired_plant: "no",
    payment_preference: "annual",
    sof_use_ropes: "no",
    sof_use_heat: "no",
    sof_asbestos: "no",
    sof_harmful_waste_disposal: "no",
    sof_work_at_heights: "no",
    sof_non_uk_work: "no",
    sof_high_risk_locations: "no",
    sof_previous_claims: "no",
    sof_previous_circumstances: "no",
    sof_legal_disputes: "no",
    sof_employee_disputes: "no",
    sof_insurance_declined: "no",
    sof_county_court_judgement: "no",
    sof_bankrupt: "no",
    sof_liquidation: "no",
    sof_criminal_offence: "no",
    town: "Northampton",
    address_1: "Sol House",
    business_name: "Some business name",
    same_correspondence_address: "yes",
    customer: {
      address_1: "Sol House",
      address_2: "29 St. Katherines Street",
      alt_telephone_number: null,
      approved_contacts: null,
      email_address: "test@test.com",
      first_name: "A",
      last_name: "P",
      telephone_number: "0700000000",
      title: "Mr",
      town: "Northampton",
      country: "GBR",
      uk_postcode: "NN1 2QZ",
      marketing_consent: {
        sb_marketing_opt_in: [""],
      },
    },
  },
};

const mergeRequestData = (data: QuoteFormData) => {
  const req = {...defaultRequest};

  req.proposal.uk_postcode = data.postcode!;
  req.proposal.customer.uk_postcode = data.postcode!;
  req.proposal.customer.first_name = data.firstName!;
  req.proposal.customer.last_name = data.lastName!;
  req.proposal.customer.email_address = data.email!;

  console.log("🚀 ~ mergeRequestData ~ req", req); // FIXME:

  return req;
}

export const getRfqs = async (token: string, data: QuoteFormData) => {
  const URL = `${process.env.API_URL}/v1/rfqs/`;
  const authorization = `Bearer ${token}`;

  // Merge form data into request template and set options
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
    body: JSON.stringify(mergeRequestData(data))
  }

  try {
    const res = await fetch(URL, options);
    const { status, statusText } = res;

    if (status === 200 || status === 201) {
      const resJson = await res.json();
      return resJson;
    }

    return {
      error: statusText
    }
  } catch(err: any) {
    console.error(err);
    return { error: err.message }
  }
}

