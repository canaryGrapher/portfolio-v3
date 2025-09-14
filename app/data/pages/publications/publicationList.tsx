import Publications from "./publications";
import type { Publications as PublicationsType } from "./publications";

interface PublicationList {
    title: string; // title of the publication
    authors: string[]; // authors of the publication
    dop: string;
    description: string; // description of the publication
    journal: PublicationsType; // journal of the publication
    link: string;
}

const publicationList: PublicationList[] = [
    {
        title: "Understanding SSL Protocol and Its Cryptographic Weaknesses",
        authors: ["Aditya Aayush", "Balachandra Muniyal"],
        dop: "August 15, 2022",
        description: "SSL certificates (Secure Sockets Layer) have become a core part of website security. They ensure the websites can transfer data to the origin server securely and privately by enabling SSL/TLS encryption. These certificates encrypt all interactions using the website's public key and decode them using the certificate's private key, which is kept on the server that issued the certificate. In addition to encryption, these certificates also help verify website identity and ensure that the user communicates with the correct server. This paper briefly mentions client-server interaction based on HTTP protocol. It gives a detailed explanation of the design and implementation of the Secure Socket Layer protocol, followed by a discussion on the cryptographic vulnerabilities associated with SSL and possible ways to tackle them.",
        journal: Publications["3rd IEEE International Conference on Intelligent Engineering and Management (ICIEM) 2022"],
        link: "https://ieeexplore.ieee.org/document/9853153/",
    },
];

export type { PublicationList };
export default publicationList;