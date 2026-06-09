import React from 'react';
import { useForm } from 'react-hook-form';
import type { PersonalDetails } from '../../types/resume';
import { Input, SectionHeader, Button } from '../ui';
import { FORM_GUIDANCE } from '../../data/guidance';
import { ChevronRight } from 'lucide-react';

interface Props {
  data: PersonalDetails;
  onChange: (data: PersonalDetails) => void;
  onNext: () => void;
}

export const PersonalStep: React.FC<Props> = ({ data, onChange, onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<PersonalDetails>({
    defaultValues: data,
  });

  const g = FORM_GUIDANCE.personal;

  const onSubmit = (values: PersonalDetails) => {
    onChange(values);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
      <SectionHeader
        title="Personal Details"
        subtitle="Your contact information and professional identity"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name *"
          id="fullName"
          placeholder={g.fullName.placeholder}
          hint={g.fullName.tip}
          error={errors.fullName?.message}
          {...register('fullName', { required: 'Full name is required' })}
        />
        <Input
          label="Professional Title *"
          id="professionalTitle"
          placeholder={g.professionalTitle.placeholder}
          hint={g.professionalTitle.tip}
          error={errors.professionalTitle?.message}
          {...register('professionalTitle', { required: 'Professional title is required' })}
        />
        <Input
          label="Email *"
          id="email"
          type="email"
          placeholder={g.email.placeholder}
          hint={g.email.tip}
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <Input
          label="Phone *"
          id="phone"
          placeholder={g.phone.placeholder}
          hint={g.phone.tip}
          error={errors.phone?.message}
          {...register('phone', { required: 'Phone is required' })}
        />
        <Input
          label="Location *"
          id="location"
          placeholder={g.location.placeholder}
          hint={g.location.tip}
          error={errors.location?.message}
          {...register('location', { required: 'Location is required' })}
        />
        <Input
          label="LinkedIn URL"
          id="linkedinUrl"
          placeholder={g.linkedinUrl.placeholder}
          hint={g.linkedinUrl.tip}
          {...register('linkedinUrl')}
        />
        <Input
          label="GitHub URL"
          id="githubUrl"
          placeholder={g.githubUrl.placeholder}
          hint={g.githubUrl.tip}
          {...register('githubUrl')}
        />
        <Input
          label="Portfolio URL"
          id="portfolioUrl"
          placeholder={g.portfolioUrl.placeholder}
          hint={g.portfolioUrl.tip}
          {...register('portfolioUrl')}
        />
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-lg p-4 text-sm text-amber-800 dark:text-amber-200">
        <div className="font-medium mb-1">💡 Recruiter Tip</div>
        <p>ATS systems parse contact info from the top of the resume. Ensure your email and phone are in plain text, not inside images or tables.</p>
      </div>

      <div className="flex justify-end">
        <Button type="submit" icon={<ChevronRight className="w-4 h-4" />}>
          Next: Summary
        </Button>
      </div>
    </form>
  );
};
