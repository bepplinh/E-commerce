export default function TabDescription() {
    return (
        <div className="space-y-8">
            <h3 className="text-[20px] font-medium text-gray-900 border-b border-gray-100 pb-4 inline-block">
                Sed do eiusmod tempor incididunt ut labore
            </h3>

            <p className="text-gray-500 leading-relaxed text-[15px]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
            </p>

            <div className="grid md:grid-cols-2 gap-12 pt-4">
                <div>
                    <h4 className="text-[17px] font-medium text-gray-900 mb-6">
                        Why choose product?
                    </h4>
                    <ul className="space-y-4 text-[14px] text-gray-500">
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                            Creat by cotton fibric with soft and smooth
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                            Simple, Configurable (e.g. size, color, etc.),
                            bundled
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                            Downloadable/Digital Products, Virtual Products
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-[17px] font-medium text-gray-900 mb-6">
                        Sample Number List
                    </h4>
                    <ol className="space-y-4 text-[14px] text-gray-500">
                        <li className="flex gap-3">
                            <span className="shrink-0 text-gray-400">1.</span>
                            Create Store-specific attributes on the fly
                        </li>
                        <li className="flex gap-3">
                            <span className="shrink-0 text-gray-400">2.</span>
                            Simple, Configurable (e.g. size, color, etc.),
                            bundled
                        </li>
                        <li className="flex gap-3">
                            <span className="shrink-0 text-gray-400">3.</span>
                            Downloadable/Digital Products, Virtual Products
                        </li>
                    </ol>
                </div>
            </div>

            <div className="pt-4">
                <h4 className="text-[17px] font-medium text-gray-900 mb-4">
                    Lining
                </h4>
                <p className="text-[14px] text-gray-500">
                    100% Polyester, Main: 100% Polyester.
                </p>
            </div>
        </div>
    );
}
