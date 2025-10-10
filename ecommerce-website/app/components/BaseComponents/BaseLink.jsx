import Link from "next/link";
import React from "react";

const BaseLink = (props) => {
	console.log(props, "chkking propds");

	return <Link {...props} />;
};

export default BaseLink;
