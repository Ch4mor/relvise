import * as dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";

import cleanCss from "gulp-clean-css"; //стиснення css файлу
import webpcss from "gulp-webpcss"; //вивід WEBP зображень
import autoPrefixer from "gulp-autoprefixer"; //додавання вендорних префіксів
import groupCssMediaQueries from "gulp-group-css-media-queries"; //групування медіа запитів

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>",
			})
		))
		.pipe(sass({
			outputStyle: 'expanded',
		}))
		.pipe(app.plugins.replace(/@img\//g, '../img/'))
		.pipe(
			app.plugins.gulpIf(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			app.plugins.gulpIf(
				app.isBuild,
				webpcss({
					webpClass: '.webp',
					noWebpClass: '.no-webp',
				})
			)
		)
		.pipe(
			app.plugins.gulpIf(
				app.isBuild,
				autoPrefixer({
					grid: true,
					overrideBrowserslist: ["last 3 versions"],
					cascade: true,
				})
			)
		)
		//розкоментувати, якщо потрібен не стиснутий дубль файлу стилів
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(
			app.plugins.gulpIf(
				app.isBuild,
				cleanCss()
			)
		)
		.pipe(rename({
			extname: ".min.css",
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browserSync.stream());
}