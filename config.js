
const ROOT = '.';
const SRC = 'src';
const DIST = 'dist';

module.exports = {
	src: {
		index: `${ROOT}/${SRC}`,
		script: `${ROOT}/${SRC}/scripts`,
		style: `${ROOT}/${SRC}/styles`
	},
	dist: {
		index: `${ROOT}/${DIST}`,
		script: `${ROOT}/${DIST}/scripts`,
		style: `${ROOT}/${DIST}/styles`
	}
};