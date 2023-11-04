import PropTypes from "prop-types";
import { Button, Typography, IconButton } from "@material-tailwind/react";
import {
  ArrowUpCircleIcon,
} from "@heroicons/react/24/solid";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <footer className="relative px-4 pt-8 pb-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <Typography variant="h4" className="mb-4" color="blue-gray">
              {title}
            </Typography>
            <Typography className="font-normal text-blue-gray-500">
              {description}
            </Typography>
            <div className="mx-auto mt-6 mb-8 flex justify-center gap-2 md:mb-0 lg:justify-start">
              {socials.map(({ color, name, path }) => (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton color="white" className="rounded-full">
                    <Typography color={color}>
                      <i className={`fa-brands fa-${name}`} />
                    </Typography>
                  </IconButton>
                </a>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
            {menus.map(({ name, items }) => (
              <div key={name}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-medium uppercase"
                >
                  {name}
                </Typography>
                <ul className="mt-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        variant="small"
                        className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr className="my-8 border-gray-500" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              {copyright}
              <IconButton color="white" className="rounded-full mx-4 mb-2" onClick={scrollToTop}>
                <Typography color="black">
                  <ArrowUpCircleIcon className="-mt-px h-9 w-9 text-blue-gray-700" />
                </Typography>
              </IconButton>
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "FakeCompany™",
  description:
    "We do not have any purpose so this description is pointless.",
  socials: [
    {
      color: "black",
      name: "steam",
      path: "https://steamcommunity.com/id/degelina",
    },
    {
      color: "black",
      name: "chrome",
      path: "https://sebastian-degerman.azurewebsites.net/",
    },
    {
      color: "black",
      name: "github",
      path: "https://github.com/Degendeg",
    },
  ],
  menus: [
    {
      name: "useful links",
      items: [
        {
          name: "Codingame",
          path: "https://www.codingame.com",
        },
        {
          name: "Upload an image",
          path: "https://upload-img.azurewebsites.net",
        },
        {
          name: "ChatGPT",
          path: "https://chat.openai.com",
        },
        {
          name: "Hexcolor",
          path: "https://hexcolor.azurewebsites.net",
        },
      ],
    },
    {
      name: "other resources",
      items: [
        {
          name: "License",
          path: "",
        },
        {
          name: "News",
          path: "",
        },
        {
          name: "Updated",
          path: "",
        },
        {
          name: "Contact",
          path: "mailto:sebastian.degerman@consid.se",
        },
      ],
    },
  ],
  copyright: (
    <>
      Copyright © {year} by{" "}
      <a
        href="https://sebastian-degerman.azurewebsites.net"
        target="_blank"
        className="text-blue-gray-500 transition-colors hover:text-blue-500"
      >
        Sebastian Degerman
      </a>
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
