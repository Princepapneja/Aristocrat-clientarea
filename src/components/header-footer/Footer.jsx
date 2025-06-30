import React, { useState } from 'react';

function Footer() {
  const [footerData, setFooterData] = useState([
    { title: "Home" },
    { title: "Games" },
    { title: "Game Assets" },
    { title: "Certificates" },
    { title: "Roadmaps" },
    { title: "Engagement Tools" },
    { title: "Contact Us" },
    { title: "Support" },
  ]);

  return (
    <div className="bg-black py-12 text-white " >
      <div className="flex justify-center">
        <img src={"/logos/linkdin.png"} alt="LinkedIn" className="h-12 w-12" />
      </div>

      <div className="grid grid-cols-2 md:flex md:justify-center md:gap-16 py-14 gap-6 text-center">
        {footerData.map((item, index) => (
          <p key={index} className="text-black-v4 font-medium">
            {item.title}
          </p>
        ))}
      </div>
      <p  className='text-black-v3 flex justify-center items-center text-center text-sm font-normal mb-5 p-2'>Stable Games Ltd, having its registered address at 206, Wisely house, Old Bakery Street, Valletta VLT 1451, Malta, is licensed and regulated by the Malta Gaming Authority to supply Type1 gaming services under a B2B Critical Gaming Supply Licence (Licence Number: MGA/B2B/785/2020, issued on 18th March 2021).</p>

      <p className="text-black-v3 text-center">©Aristocrat 2025. All Rights Reserved.</p>
    </div>
  );
}

export default Footer;
