export default defineAppConfig({
  ui: {
    strategy: 'merge', // Default behavior: merges with local configurations

    // Accordion
    accordion: {
      wrapper: 'w-full flex flex-col',
      container: 'bg-slate-200 rounded-lg p-1 mb-2',
      item: {
        base: 'w-full flex rounded-lg flex-col bg-transparent',
        size: 'text-md',
        padding: 'p-3',
        icon: 'ms-auto transform transition-transform duration-200 flex-shrink-0',
        color: 'text-slate-500',
      },
      transition: {
        enterActiveClass: 'overflow-hidden transition-[height] duration-200 ease-out',
        leaveActiveClass: 'overflow-hidden transition-[height] duration-200 ease-out'
      },
      default: {
        openIcon: 'i-heroicons-chevron-down-20-solid',
        closeIcon: '',
        class: 'mb-1.5 w-full',
        variant: 'soft',
        truncate: true
      }
    },

    // Alert
    alert: {
      default: {
        variant: 'solid', // solid, outline
        color: 'blue',
      },
      color: {
        blue: 'bg-blue-500 text-white',
        red: 'bg-red-500 text-white',
        yellow: 'bg-yellow-500 text-white',
        green: 'bg-green-500 text-white',
      },
    },

    // Avatar
    avatar: {
      default: {
        size: 'md', // sm, md, lg
        rounded: 'rounded-full',
      },
    },

    // Badge
    badge: {
      default: {
        size: 'sm',
        color: 'gray',
      },
      color: {
        blue: 'bg-blue-200 text-blue-800',
      },
    },

    // Breadcrumb
    breadcrumb: {
      default: {
        link: 'text-blue-500 hover:underline',
        separator: 'text-slate-400',
      },
    },

    // Button
    button: {
      default: {
        size: 'md',
        color: 'black',
        variant: 'solid',
        rounded: 'rounded-md',
      },
      base: "focus:outline-none focus:ring-2 transition flex ease-in-out duration-150",
      font: "text-sm",
      size: {
        xl: "px-10 py-2",
        lg: "px-6 py-3",
        md: "px-4 py-2",
        sm: "px-3 py-1.5"
      },
      color: {
        black: {
          solid: "bg-black text-white hover:bg-black",
          outline: "text-black dark:text-neutral-900 border-2 border-black hover:bg-black dark:border-black"
        },
        secondary: {
          solid: "bg-secondary-500 text-white dark:text-neutral-900 hover:bg-secondary-600 dark:bg-secondary-500",
          outline: "text-secondary-500 dark:text-neutral-900 border-2 border-secondary-500 hover:bg-secondary-500 dark:border-secondary-500"
        }
      },
      rounded: "rounded-lg"
    },

    // Card
    card: {
      strategy: 'merge', // Default behavior: merges with local configurations
      default: {
        padding: 'p-4',
        shadow: 'shadow-md',
        rounded: 'rounded-lg',
        background: "bg-white-500 dark:bg-slate-800",
      },
      base: "overflow-hidden rounded-lg text-black dark:text-slate-400 bg-white-500 dark:bg-neutral-800",
      body: {
        base: "",
        padding: "px-4 pt-2 pb-0 sm:p-6",
        background: "bg-white-500 dark:bg-slate-800",
      },
      ring: "ring-1 ring-gray-200 dark:ring-gray-200",
      divide: "divide-y divide-gray-200 dark:divide-white-300",
      footer: {
        base: "h-full",
        padding: "px-4 py-4 sm:p-6",
        background: "bg-white-500 dark:bg-slate-800",
      },
      header: {
        base: "",
        padding: "px-4 py-4 sm:p-6",
        background: "bg-white-500 dark:bg-slate-800",
      },
      shadow: "",
      rounded: "",
      background: "bg-white-500 dark:bg-slate-800",
    },

    // Carousel
    carousel: {
      default: {
        indicator: 'bg-gray-500',
      },
      wrapper: 'relative',
      container: 'relative w-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth',
      item: 'basis-full w-full flex-shrink-0',
      arrows: {
        wrapper: 'flex items-center justify-between'
      },
      indicators: {
        wrapper: 'absolute flex items-center justify-center gap-3 bottom-4 inset-x-0',
        base: 'h-3 w-3',
        active: 'bg-black dark:bg-black',
        inactive: 'bg-gray-100 dark:bg-gray-800'
      },
    },

    // Checkbox
    checkbox: {
      variants: {
        color: {
          black: 'focus-visible:outline-(--ui-black)'
        }
      },
      default: {
        size: 'md',
        color: 'black',
      },
    },

    // Chip
    chip: {
      default: {
        size: 'sm',
        rounded: 'rounded-full',
        color: 'gray',
      },
    },

    // CommandPalette
    commandPalette: {
      default: {
        input: 'border border-gray-300 rounded-lg',
        item: 'p-2 hover:bg-gray-100',
      },
    },

    // Container
    container: {
      strategy: 'merge',
      base: '',
      padding: 'px-6 sm:px-8 lg:px-10',
      constrained: '',
    },

    // ContextMenu
    contextMenu: {
      default: {
        item: 'px-4 py-2 hover:bg-gray-100',
      },
    },

    // DatePicker
    datePicker: {
      default: {
        input: 'border border-gray-300 rounded-lg',
        calendar: 'bg-white border border-gray-200 rounded-lg shadow-lg',
      },
    },

    // Divider
    divider: {
      default: {
        color: 'border-gray-200',
      },
    },

    // Dropdown
    dropdown: {
      default: {
        menu: 'bg-white border border-gray-200 rounded-lg shadow-md',
        item: 'px-4 py-2 hover:bg-gray-100',
      },
    },

    // Form
    form: {
      strategy: 'merge', // Default behavior: merges with local configurations
      default: {
        size: 'md',
      },
      wrapper: 'space-y-4',
      inner: 'space-y-4',
      label: {
        wrapper: 'flex items-center',
        required: 'text-red-500',
        base: 'text-slate-700 font-medium',
      },
      size: {
        md: 'text-sm',
      },
      container: "grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-4 md:grid-cols-3 md:gap-x-4 md:gap-y-4 lg:grid-cols-4 lg:gap-x-4 lg:gap-y-4 xl:grid-cols-5 xl:gap-x-4 xl:gap-y-4",
      description: "text-slate-500",
      hint: "text-slate-500",
      help: "text-red-500",
      error: "text-red-500",
    },

    // FormGroup
    formGroup: {
      default: {
        label: 'text-slate-700 font-medium',
        error: 'text-red-500 text-sm',
      },
    },

    // HorizontalNavigation
    horizontalNavigation: {
      default: {
        link: 'px-3 py-2 text-slate-500 hover:text-slate-900 hover:bg-gray-100 rounded-md',
      },
    },

    // Icon
    icon: {
      default: {
        size: 'md', // sm, md, lg
        color: 'gray-700',
      },
    },

    // Input
    input: {
      wrapper: 'relative',
      base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:ring-black border-0 text-slate-900 dark:text-slate-300',
      form: 'form-input',
      rounded: 'rounded-md',
      placeholder: 'placeholder-black font-500',
      file: {
        base: 'file:mr-1.5 file:font-medium file:text-slate-900 dark:file:text-slate-400 file:bg-transparent file:border-0 file:p-0 file:outline-none'
      },
      size: {
        '2xs': 'text-xs',
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-sm',
        xl: 'text-base'
      },
      gap: {
        '2xs': 'gap-x-1',
        xs: 'gap-x-1.5',
        sm: 'gap-x-1.5',
        md: 'gap-x-2',
        lg: 'gap-x-2.5',
        xl: 'gap-x-2.5'
      },
      padding: {
        '2xs': 'px-2 py-1',
        xs: 'px-2.5 py-1.5',
        sm: 'px-2.5 py-1.5',
        md: 'px-3 py-2',
        lg: 'px-3.5 py-2.5',
        xl: 'px-3.5 py-2.5'
      },
      leading: {
        padding: {
          '2xs': 'ps-7',
          xs: 'ps-8',
          sm: 'ps-9',
          md: 'ps-10',
          lg: 'ps-11',
          xl: 'ps-12'
        }
      },
      trailing: {
        padding: {
          '2xs': 'pe-7',
          xs: 'pe-8',
          sm: 'pe-9',
          md: 'pe-10',
          lg: 'pe-11',
          xl: 'pe-12'
        }
      },
      color: {
        slate: {
          outline: 'shadow-sm bg-transparent text-black ring-1 ring-inset ring-black focus:ring-1 focus:ring-inset focus:ring-black'
        }
      },
      variant: {
        outline: 'shadow-sm bg-transparent text-black ring-1 ring-inset ring-black focus:ring-1 focus:ring-inset focus:ring-black',
        none: 'bg-transparent focus:ring-0 focus:shadow-none'
      },
      icon: {
        base: 'flex-shrink-0 text-slate-400 dark:text-slate-500',
        color: 'text-slate-500 dark:text-slate-400',
        loading: 'animate-spin',
        size: {
          '2xs': 'h-4 w-4',
          xs: 'h-4 w-4',
          sm: 'h-5 w-5',
          md: 'h-5 w-5',
          lg: 'h-5 w-5',
          xl: 'h-6 w-6'
        },
        leading: {
          wrapper: 'absolute inset-y-0 start-0 flex items-center',
          pointer: 'pointer-events-none',
          padding: {
            '2xs': 'px-2',
            xs: 'px-2.5',
            sm: 'px-2.5',
            md: 'px-3',
            lg: 'px-3.5',
            xl: 'px-3.5'
          }
        },
        trailing: {
          wrapper: 'absolute inset-y-0 end-0 flex items-center',
          pointer: 'pointer-events-none',
          padding: {
            '2xs': 'px-2',
            xs: 'px-2.5',
            sm: 'px-2.5',
            md: 'px-3',
            lg: 'px-3.5',
            xl: 'px-3.5'
          }
        }
      },
      default: {
        size: 'sm',
        color: 'slate',
        variant: 'outline',
        loadingIcon: 'i-heroicons-arrow-path-20-solid'
      }
    }, 

    // InputMenu
    inputMenu: {
      default: {
        input: 'border border-gray-300 rounded-lg',
        menu: 'bg-white border border-gray-200 rounded-lg shadow-md',
      },
    },

    // Kbd
    kbd: {
      default: {
        padding: 'px-2 py-1',
        background: 'bg-gray-200',
        rounded: 'rounded-md',
      },
    },

    // Link
    link: {
      default: {
        color: 'text-blue-500 hover:underline',
      },
    },

    // Meter
    meter: {
      default: {
        color: 'bg-blue-500',
        background: 'bg-gray-200',
      },
    },

    // Modal
    modal: {
      default: {
        overlay: 'bg-black bg-opacity-50',
        container: 'bg-white p-6 rounded-lg shadow-lg',
      },
    },

    // Notification
    notification: {
      default: {
        color: 'bg-blue-500 text-white',
      },
    },

    // Pagination
    pagination: {
      default: {
        link: 'px-3 py-2 text-slate-500 hover:text-slate-900',
      },
    },

    // Popover
    popover: {
      default: {
        arrow: 'bg-white',
        content: 'bg-white border border-gray-200 rounded-lg shadow-md',
      },
    },

    // Progress
    progress: {
      default: {
        color: 'bg-blue-500',
        background: 'bg-gray-200',
      },
    },

    // RadioGroup
    radioGroup: {
      default: {
        item: 'px-3 py-2 rounded-md hover:bg-gray-100',
      },
    },

    // Range
    range: {
      default: {
        track: 'bg-gray-200',
        thumb: 'bg-blue-500',
      },
    },

    // Select
    select: {
      default: {
        input: 'border border-gray-300 rounded-lg',
      },
    },

    // SelectMenu
    selectMenu: {
      default: {
        menu: 'bg-white border border-gray-200 rounded-lg shadow-md',
      },
    },

    // Skeleton
    skeleton: {
      default: {
        color: 'bg-gray-200',
      },
    },

    // Slideover
    slideover: {
      default: {
        container: 'bg-white p-6 rounded-lg shadow-lg',
      },
    },

    // Table
    table: {
      default: {
        header: 'bg-gray-50 text-left text-sm font-medium text-slate-500',
        cell: 'text-sm text-slate-700 px-4 py-2 border-t border-gray-200',
      },
    },

    // Tabs
    tabs: {
      default: {
        tab: 'px-3 py-2 text-slate-500 hover:text-slate-900 hover:bg-gray-100 rounded-md',
      },
    },

    // Textarea
    textarea: {
      form: 'form-textarea',
      wrapper: 'relative',
      base: 'relative block w-full disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none border-0 text-slate-700 dark:text-slate-200',
      rounded: 'rounded-md',
      placeholder: 'placeholder-slate-900 dark:placeholder-slate-400',
      file: {
        base: 'file:mr-1.5 file:font-medium file:text-slate-500 dark:file:text-slate-400 file:bg-transparent file:border-0 file:p-0 file:outline-none'
      },
      size: {
        '2xs': 'text-xs',
        xs: 'text-xs',
        sm: 'text-sm',
        md: 'text-sm',
        lg: 'text-sm',
        xl: 'text-base'
      },
      gap: {
        '2xs': 'gap-x-1',
        xs: 'gap-x-1.5',
        sm: 'gap-x-1.5',
        md: 'gap-x-2',
        lg: 'gap-x-2.5',
        xl: 'gap-x-2.5'
      },
      padding: {
        '2xs': 'px-2 py-1',
        xs: 'px-2.5 py-1.5',
        sm: 'px-2.5 py-1.5',
        md: 'px-3 py-2',
        lg: 'px-3.5 py-2.5',
        xl: 'px-3.5 py-2.5'
      },
      leading: {
        padding: {
          '2xs': 'ps-7',
          xs: 'ps-8',
          sm: 'ps-9',
          md: 'ps-10',
          lg: 'ps-11',
          xl: 'ps-12'
        }
      },
      trailing: {
        padding: {
          '2xs': 'pe-7',
          xs: 'pe-8',
          sm: 'pe-9',
          md: 'pe-10',
          lg: 'pe-11',
          xl: 'pe-12'
        }
      },
      color: {
        slate: {
          outline: 'shadow-sm bg-transparent text-black ring-1 ring-inset ring-black focus:ring-1 focus:ring-inset focus:ring-black'
        }
      },
      variant: {
        outline: 'shadow-sm bg-transparent text-black ring-1 ring-inset ring-black focus:ring-1 focus:ring-inset focus:ring-black',
        none: 'bg-transparent focus:ring-0 focus:shadow-none'
      },
      default: {
        size: 'sm',
        color: 'slate',
        variant: 'outline',
      }
    },

    // Toggle
    toggle: {
      default: {
        track: 'bg-gray-200',
        thumb: 'bg-blue-500',
      },
    },

    // Tooltip
    tooltip: {
      default: {
        background: 'bg-black text-white',
      },
    },
  },
});
