import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function PageTitle({ id, heading, children }) {
  return (
    <div id={id} className="mx-auto w-full px-4 text-center lg:w-6/12">
      <Typography variant="h2" color="blue-gray" className="mb-3">
        {heading}
      </Typography>
      <Typography variant="lead" className="text-blue-gray-500">
        {children}
      </Typography>
    </div>
  );
}

PageTitle.propTypes = {
  id: PropTypes.string,
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

PageTitle.displayName = "/src/widgets/layout/page-title.jsx";

export default PageTitle;
