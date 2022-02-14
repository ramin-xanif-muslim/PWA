import React, { useEffect, useRef } from "react";

function useScroll(parentRef, childrenRef, callback) {
	const observer = useRef();

	useEffect(() => {
		const options = {
			root: parentRef.current,
			rootMargin: "0px",
			threshold: 0,
		};
		observer.current = new IntersectionObserver(([target]) => {
			if (target.isIntersecting) {
				console.log("intersekting",target);
				callback();
			}
		}, options);
        observer.current.observe(childrenRef.current)
        return function () {
            observer.current.unobserve(childrenRef.current)
        }
	}, [callback]);
	return;
}

export default useScroll;
