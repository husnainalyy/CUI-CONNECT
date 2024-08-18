import Image from 'next/image';

import { ReactNode } from 'react';

interface CtaProps {
  cta: {
    image: string;
    title: string;
    button?: {
      enable: boolean;
      link: string;
      rel: string;
      label: string;
    };
  };
}

export default function Cta({ cta }: CtaProps) {
    return (
        <section className="section px-4">
            <div className="section container rounded-xl shadow">
                <div className="row mx-auto items-center justify-center">
                    <div className="md:col-5 lg:col-4">
                        <Image
                            className="w-full"
                            src={cta?.image}
                            alt="call to action image"
                            width={325}
                            height={206}
                        />
                    </div>
                    <div className="mt-5 text-center md:mt-0 md:text-left md:col-6 lg:col-5">
                        <h2>{cta?.title}</h2>
                        <p>dfdfggf</p>
                        {cta?.button?.enable && (
                            <a
                                className="btn btn-primary mt-4"
                                href={cta?.button?.link}
                                rel={cta?.button?.rel}
                            >
                                {cta?.button?.label}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
